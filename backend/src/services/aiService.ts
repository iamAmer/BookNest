import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load .env from project root
const rootEnvPath = path.resolve(__dirname, '../../../.env')
const backendEnvPath = path.resolve(__dirname, '../../.env')
const envPath = fs.existsSync(rootEnvPath) ? rootEnvPath : backendEnvPath
dotenv.config({ path: envPath })

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash'

export interface QuizQuestion {
  question: string
  options: string[]
  correct_answer: string
  explanation: string
}

export interface QuizData {
  cefrLevel: string
  questions: QuizQuestion[]
}

export interface ClassificationResult {
  cefrLevel: string
}

const VALID_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const VALID_DIFFICULTIES = ['easy', 'medium', 'hard']

const DEFINITION_SCHEMA = {
  type: 'object',
  properties: {
    word: { type: 'string' },
    definition: { type: 'string' },
    example: { type: 'string' },
  },
  required: ['word', 'definition', 'example'],
}

const QUIZ_SCHEMA = {
  type: 'object',
  properties: {
    cefr_level: {
      type: 'string',
      enum: VALID_LEVELS,
    },
    questions: {
      type: 'array',
      minItems: 3,
      maxItems: 15,
      items: {
        type: 'object',
        properties: {
          question: { type: 'string' },
          options: {
            type: 'array',
            minItems: 4,
            maxItems: 4,
            items: { type: 'string' },
          },
          correct_answer: { type: 'string' },
          explanation: { type: 'string' },
        },
        required: ['question', 'options', 'correct_answer', 'explanation'],
      },
    },
  },
  required: ['cefr_level', 'questions'],
}

const LEVEL_SCHEMA = {
  type: 'object',
  properties: {
    cefr_level: {
      type: 'string',
      enum: VALID_LEVELS,
    },
  },
  required: ['cefr_level'],
}

const getDifficultyInstruction = (difficulty: string) => {
  if (difficulty === 'easy') {
    return 'Use easier wording and direct questions while staying faithful to the source.'
  }
  if (difficulty === 'hard') {
    return 'Use more challenging wording and deeper conceptual distractors while staying faithful to the source.'
  }
  return 'Use balanced wording and moderate complexity while staying faithful to the source.'
}

const buildQuizPrompt = ({
  sourceType,
  summary,
  topic,
  questionCount,
  difficulty,
  cefrLevel,
}: {
  sourceType: string
  summary?: string
  topic?: string
  questionCount: number
  difficulty: string
  cefrLevel?: string
}) => {
  const sourceInstructions =
    sourceType === 'topic'
      ? [
          'Source type: Topic-based generation.',
          `Topic: ${topic?.trim() || '(none)'}`,
          'Create questions from this topic using generally accepted foundational knowledge.',
        ]
      : [
          'Source type: Content-based generation.',
          'Use the provided content/summary as the only primary source.',
          `Source summary/content: ${summary?.trim() || '(none)'}`,
          cefrLevel
            ? `The source has already been classified as CEFR ${cefrLevel}. Keep all questions aligned with CEFR ${cefrLevel}.`
            : 'Classify the content level first and ensure questions match that level.',
        ]

  return [
    'You are a quiz authoring assistant.',
    'Generate high-quality multiple-choice questions with one correct option each.',
    `Return exactly ${questionCount} questions.`,
    getDifficultyInstruction(difficulty),
    'Explanations must be concise and useful (1 sentence).',
    'Each options array must include the correct answer text exactly once.',
    ...sourceInstructions,
  ].join('\n')
}

const buildLevelPrompt = ({ summary }: { summary?: string }) => {
  return [
    'You are a CEFR language-level classifier.',
    'Analyze the provided content and return only the CEFR level.',
    'Use one of: A1, A2, B1, B2, C1, C2.',
    'Consider vocabulary range, sentence complexity, and abstractness.',
    `Source summary/content: ${summary?.trim() || '(none)'}`,
  ].join('\n')
}

const requestGemini = async ({
  schema,
  parts,
  temperature,
}: {
  schema: any
  parts: any[]
  temperature: number
}) => {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing.')
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts,
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        temperature,
      },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini request failed: ${response.status} ${errorText}`)
  }

  const payload = (await response.json()) as any
  const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    throw new Error('Gemini returned an empty response.')
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error('Gemini returned invalid JSON.')
  }
}

const parseCefrLevel = (rawLevel: any): string => {
  const level = String(rawLevel || '').toUpperCase().trim()
  if (!VALID_LEVELS.includes(level)) {
    throw new Error('Gemini returned an invalid CEFR level.')
  }
  return level
}

const validateQuestionShape = (questions: any[]): questions is QuizQuestion[] => {
  if (!Array.isArray(questions)) return false
  return questions.every((q) => {
    if (!q || typeof q !== 'object') return false
    if (!q.question || !Array.isArray(q.options) || !q.correct_answer || !q.explanation) return false
    if (q.options.length !== 4) return false
    return q.options.includes(q.correct_answer)
  })
}

export const classifyLevel = async (params: {
  summary?: string
  pdfBuffer?: Buffer
}): Promise<ClassificationResult> => {
  const parts: any[] = [
    {
      text: buildLevelPrompt({ summary: params.summary }),
    },
  ]

  if (params.pdfBuffer) {
    parts.push({
      inline_data: {
        mime_type: 'application/pdf',
        data: params.pdfBuffer.toString('base64'),
      },
    })
  }

  const data = await requestGemini({
    schema: LEVEL_SCHEMA,
    parts,
    temperature: 0.2,
  })

  return {
    cefrLevel: parseCefrLevel(data.cefr_level),
  }
}

export const defineWord = async (word: string) => {
  const prompt = [
    'You are a dictionary assistant for English language learners.',
    `Define this word: "${word.trim()}"`,
    'Return a concise, learner-friendly definition (1-2 sentences).',
    'Also provide a simple example sentence using the word.',
    'If the word is ambiguous, provide the most common meaning.',
  ].join('\n')

  const data = await requestGemini({
    schema: DEFINITION_SCHEMA,
    parts: [{ text: prompt }],
    temperature: 0.2,
  })

  return {
    word: data.word || word.trim(),
    definition: data.definition || '',
    example: data.example || '',
  }
}

export const generateQuiz = async (params: {
  sourceType: 'pdf' | 'topic'
  summary?: string
  topic?: string
  pdfBuffer?: Buffer
  questionCount: number
  difficulty: string
  cefrLevel?: string
}): Promise<QuizData> => {
  const parts: any[] = [
    {
      text: buildQuizPrompt({
        sourceType: params.sourceType,
        summary: params.summary,
        topic: params.topic,
        questionCount: params.questionCount,
        difficulty: params.difficulty,
        cefrLevel: params.cefrLevel,
      }),
    },
  ]

  if (params.pdfBuffer) {
    parts.push({
      inline_data: {
        mime_type: 'application/pdf',
        data: params.pdfBuffer.toString('base64'),
      },
    })
  }

  const data = await requestGemini({
    schema: QUIZ_SCHEMA,
    parts,
    temperature: 0.5,
  })

  const detectedLevel = parseCefrLevel(data.cefr_level)

  if (!validateQuestionShape(data.questions)) {
    throw new Error('Gemini returned invalid questions data.')
  }

  return {
    cefrLevel: params.sourceType === 'pdf' && params.cefrLevel ? params.cefrLevel : detectedLevel,
    questions: data.questions,
  }
}

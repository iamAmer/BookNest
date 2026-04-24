import axios from 'axios';

const API_BASE = '/api/reader';

/**
 * Service for handling quiz-related API calls
 */
const quizService = {
  /**
   * Get quiz questions for a specific book
   * @param {string|number} bookId - The ID of the book
   * @param {string} cefrLevel - Target CEFR level (A1-C2)
   * @param {number} numQuestions - Number of questions to generate (default: 5)
   * @returns {Promise<Object>} Quiz data including questions and CEFR level
   */
  getQuizQuestions: async (bookId, cefrLevel, numQuestions = 5) => {
    try {
      const response = await axios.get(`${API_BASE}/quiz/${bookId}`, {
        params: {
          cefr_level: cefrLevel,
          numQuestions: numQuestions
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch quiz questions: ${error.message}`);
    }
  },

  /**
   * Submit quiz answers for scoring
   * @param {Object} quizData - Quiz submission data
   * @param {string|number} quizData.bookId - The ID of the book
   * @param {Array} quizData.answers - Array of selected answer indices
   * @param {number} quizData.score - Calculated score (0-100)
   * @param {number} quizData.total_questions - Total number of questions
   * @returns {Promise<Object>} Quiz results including score and achievements
   */
  submitQuiz: async (quizData) => {
    try {
      const response = await axios.post(`${API_BASE}/quiz/submit`, quizData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to submit quiz: ${error.message}`);
    }
  },

  /**
   * Get a simplified version of a sentence for a specific CEFR level
   * @param {string} sentence - The sentence to simplify
   * @param {string} cefrLevel - Target CEFR level (A1-C2)
   * @returns {Promise<Object>} Simplification result
   */
  simplifySentence: async (sentence, cefrLevel) => {
    try {
      const response = await axios.post(`${API_BASE}/simplify`, {
        sentence,
        cefr_level: cefrLevel
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to simplify sentence: ${error.message}`);
    }
  }
};

export default quizService;
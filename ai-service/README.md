# 🤖 BookNest AI Service

The AI Service is a Python/FastAPI backend that provides intelligent language processing capabilities for the BookNest adaptive reading platform. It specializes in two key functions:

1. **Language Level Classification**: Analyzing text to determine the appropriate CEFR (Common European Framework of Reference for Languages) level (A1-C2)
2. **Adaptive Quiz Generation**: Creating customized multiple-choice questions based on book content and the user's language level

This service works in conjunction with the BookNest Node.js/Express backend, which acts as a proxy to these AI capabilities.

## 🔧 Architecture

```
BookNest Frontend 
        ↓ (HTTP requests)
BookNest Backend (Node.js/Express) 
        ↓ (HTTP proxy)
AI Service (Python/FastAPI) 
        ↓ (Google Gemini API)
Language Processing & Quiz Generation
```

### Components
- **Backend**: FastAPI server handling HTTP requests
- **AI Engine**: Google's Gemini API for natural language processing
- **Frontend Demo**: React/Vite interface (`4-react-quiz-generator/`) for testing AI capabilities

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js (v16+) - for the frontend demo
- Google Gemini API key

### Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install frontend demo dependencies:
```bash
cd 4-react-quiz-generator
npm install
```

### Configuration

Create a `.env` file from the example:
```bash
cp .env.example .env
```

Edit `.env` to add your Gemini API key:
```
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=8787
HOST=0.0.0.0
```

### Running the Service

#### Option 1: Run frontend and backend together (recommended for development)
```bash
npm run dev:full
```

#### Option 2: Run separately
```bash
# In one terminal - start API server
npm run dev:api

# In another terminal - start frontend demo
npm run dev
```

### API Endpoints

When integrated with the BookNest backend, these endpoints are proxied:

#### Quiz Generation
```
POST /quiz/{bookId}
```
- **Description**: Generates adaptive quiz questions for a specific book
- **Parameters**:
  - `bookId` (path): ID of the book to generate quiz for
  - `cefr_level` (query, optional): Target CEFR level (A1-C2)
  - `numQuestions` (query, optional): Number of questions (default: 5, range: 3-15)
- **Returns**: 
  ```json
  {
    "cefrLevel": "B1",
    "questions": [
      {
        "id": 1,
        "question": "Sample question?",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 0
      }
    ]
  }
  ```

#### Sentence Simplification
```
POST /simplify
```
- **Description**: Simplifies a sentence to match a specific CEFR level
- **Body**:
  ```json
  {
    "sentence": "The quick brown fox jumps over the lazy dog.",
    "cefr_level": "B1"
  }
  ```
- **Returns**:
  ```json
  {
    "original": "The quick brown fox jumps over the lazy dog.",
    "simplified": "The fast brown fox jumps over the sleepy dog.",
    "level": "B1"
  }
  ```

### Standalone API (for testing)

The AI service also provides a direct API for testing:
```
POST /api/generate-quiz
```
Accepts PDF files or text summaries to generate quiz questions and determine CEFR level.

## 📁 Project Structure

```
ai-service/
├── 4-react-quiz-generator/   # React/Vite frontend demo
│   ├── src/                  # Frontend source code
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
├── server/                   # Python backend source
│   ├── main.py               # FastAPI application entry point
│   ├── utils/                # Utility functions
│   │   ├── gemini.py         # Gemini API integration
│   │   ├── text_processing.py # Text analysis helpers
│   │   └── quiz_generator.py  # Question generation logic
│   └── requirements.txt      # Python dependencies
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── package.json              # Root package.json (manages both ends)
├── README.md                 # This file
└── requirements.txt          # Python dependencies (root level)
```

## 🔧 How It Integrates with BookNest

The AI Service is designed to work specifically with the BookNest backend:

1. **Backend Proxy**: The BookNest backend (`/backend/src/routes/aiRoutes.ts`) proxies requests to:
   - `GET /api/reader/quiz/:bookId` → AI Service `/quiz/{bookId}`
   - `POST /api/reader/simplify` → AI Service `/simplify`

2. **Authentication Flow**:
   - Frontend authenticates with BookNest backend
   - Backend verifies JWT token
   - Backend forwards requests to AI Service (no additional auth needed on AI service in current setup)
   - AI Service processes request and returns results
   - Backend formats response and returns to frontend

3. **Data Flow Example**:
   - User requests quiz for book ID 123
   - Frontend → Backend: `GET /api/reader/quiz/123?cefr_level=B1`
   - Backend → AI Service: `GET /quiz/123?cefr_level=B1&numQuestions=5`
   - AI Service processes book 123 content, generates B1-level questions
   - AI Service → Backend: `{ cefrLevel: "B1", questions: [...] }`
   - Backend → Frontend: Same response wrapped in success envelope

## 🛠️ Development

### Backend Development
```bash
# Start API server with auto-reload
npm run dev:api
# Or directly with uvicorn
cd server
uvicorn main:app --reload --host 0.0.0.0 --port 8787
```

### Frontend Demo Development
```bash
cd 4-react-quiz-generator
npm run dev
```

### Testing Endpoints
```bash
# Test simplification
curl -X POST http://localhost:8787/simplify \
  -H "Content-Type: application/json" \
  -d '{"sentence":"The quick brown fox jumps over the lazy dog.","cefr_level":"B1"}'

# Test quiz generation (requires book to exist in backend)
curl -X GET "http://localhost:8787/quiz/1?cefr_level=B1&numQuestions=3"
```

## 📝 Environment Variables

```
# AI Service Configuration
GEMINI_API_KEY=your_gemini_api_key_from_google_ai_studio
GEMINI_MODEL=gemini-2.5-flash
PORT=8787
HOST=0.0.0.0

# Optional: Logging
LOG_LEVEL=info
```

## ⚠️ Important Notes

1. **API Key Security**: Never commit your `.env` file. The AI service backend is the only place that should have access to the Gemini API key.

2. **Rate Limits**: Be aware of Gemini API rate limits when running multiple instances or during heavy usage.

3. **Model Selection**: The `gemini-2.5-flash` model offers a good balance of speed and capability for language processing tasks.

4. **Fallback Behavior**: The service includes basic fallback processing if the Gemini API is unavailable, though quality will be reduced.

5. **Integration Point**: The AI service is designed to be called exclusively through the BookNest backend proxy for security and consistency.

## 🔍 Troubleshooting

### Common Issues

**API Key Errors:**
- Verify your Gemini API key is valid and has access to the Generative Language API
- Check that the key is correctly placed in the `.env` file
- Ensure there are no extra spaces or characters in the key value

**Connection Refused:**
- Verify the AI service is running: `ps aux | grep uvicorn`
- Check if port 8787 is available: `lsof -i :8787`
- Ensure you're connecting to the correct host and port

**Model Not Found:**
- Verify you have access to the `gemini-2.5-flash` model in your Google Cloud project
- Try changing to `gemini-pro` or another available model in the .env file

**Quiz Generation Failures:**
- Check backend logs for proxy errors
- Verify the book ID exists in the BookNest database
- Ensure the AI service can access book content (if using PDF processing)

## 📄 License

This project is part of the BookNest platform and follows the same licensing terms.

## 👥 Contributing

Please read the main repository's CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.
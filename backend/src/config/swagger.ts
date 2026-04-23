const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookNest API',
      version: '1.0.0',
      description:
        'RESTful API for BookNest - An adaptive reading platform with AI-powered features',
      contact: {
        name: 'BookNest Support',
        email: 'support@booknest.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Current Environment',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token (get from /api/auth/login)',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            isAdmin: { type: 'boolean' },
          },
        },
        Profile: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            fullName: { type: 'string' },
            bio: { type: 'string' },
            avatarUrl: { type: 'string' },
            cefrLevel: {
              type: 'string',
              enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Book: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            author: { type: 'string' },
            description: { type: 'string' },
            difficulty: {
              type: 'string',
              enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            },
            totalPages: { type: 'number' },
            categoryId: { type: 'string' },
            rating: { type: 'number', minimum: 0, maximum: 5 },
            views: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Progress: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            bookId: { type: 'string' },
            currentPage: { type: 'number' },
            isCompleted: { type: 'boolean' },
            completionPercentage: { type: 'number' },
            timeSpentSeconds: { type: 'number' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Note: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            bookId: { type: 'string' },
            pageNumber: { type: 'number' },
            content: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Vocabulary: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            word: { type: 'string' },
            definition: { type: 'string' },
            contextSentence: { type: 'string' },
            masteryLevel: { type: 'number', minimum: 0, maximum: 5 },
            lastReviewedAt: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Achievement: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            criteria: { type: 'object' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
            status: { type: 'number' },
          },
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: [
    './src/config/swaggerDef.ts',
    './src/routes/authRoutes.ts',
    './src/routes/profileRoutes.ts',
    './src/routes/bookRoutes.ts',
    './src/routes/progressRoutes.ts',
    './src/routes/notesRoutes.ts',
    './src/routes/vocabularyRoutes.ts',
    './src/routes/aiRoutes.ts',
    './src/routes/achievementsRoutes.ts',
    './src/routes/adminRoutes.ts',
  ],
}

export default swaggerOptions

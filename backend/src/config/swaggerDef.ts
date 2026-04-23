/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, fullName]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *               fullName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Email already exists
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Invalid refresh token
 */

/**
 * @swagger
 * /api/auth/status:
 *   get:
 *     summary: Get current user status
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User status retrieved
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Unauthorized
 *   patch:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               bio:
 *                 type: string
 *               avatarUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/profile/level:
 *   patch:
 *     summary: Update CEFR level
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cefrLevel:
 *                 type: string
 *                 enum: [A1, A2, B1, B2, C1, C2]
 *     responses:
 *       200:
 *         description: Level updated
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Search and filter books
 *     tags: [Books]
 *     parameters:
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *       - name: category
 *         in: query
 *         schema:
 *           type: string
 *       - name: difficulty
 *         in: query
 *         schema:
 *           type: string
 *           enum: [A1, A2, B1, B2, C1, C2]
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *           default: 20
 *       - name: offset
 *         in: query
 *         schema:
 *           type: number
 *           default: 0
 *     responses:
 *       200:
 *         description: Books retrieved
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get specific book
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book retrieved
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /api/books/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Categories retrieved
 */

/**
 * @swagger
 * /api/books/trending:
 *   get:
 *     summary: Get trending books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Trending books retrieved
 */

/**
 * @swagger
 * /api/progress/update:
 *   post:
 *     summary: Update reading progress
 *     tags: [Progress]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bookId, currentPage]
 *             properties:
 *               bookId:
 *                 type: string
 *               currentPage:
 *                 type: number
 *               timeSpentSeconds:
 *                 type: number
 *     responses:
 *       200:
 *         description: Progress updated
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/progress/{bookId}:
 *   get:
 *     summary: Get reading progress for a book
 *     tags: [Progress]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Progress retrieved
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get user notes
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: query
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *       - name: offset
 *         in: query
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Notes retrieved
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a note
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bookId, pageNumber, content]
 *             properties:
 *               bookId:
 *                 type: string
 *               pageNumber:
 *                 type: number
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/vocabulary/save:
 *   post:
 *     summary: Save a word to vocabulary
 *     tags: [Vocabulary]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [word, definition]
 *             properties:
 *               word:
 *                 type: string
 *               definition:
 *                 type: string
 *               contextSentence:
 *                 type: string
 *     responses:
 *       201:
 *         description: Word saved
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/vocabulary:
 *   get:
 *     summary: Get user vocabulary
 *     tags: [Vocabulary]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: masteryLevel
 *         in: query
 *         schema:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *       - name: offset
 *         in: query
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Vocabulary retrieved
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/vocabulary/stats:
 *   get:
 *     summary: Get vocabulary statistics
 *     tags: [Vocabulary]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Stats retrieved
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/vocabulary/{id}:
 *   put:
 *     summary: Update word mastery level
 *     tags: [Vocabulary]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               masteryLevel:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Word updated
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a word
 *     tags: [Vocabulary]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Word deleted
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/reader/simplify:
 *   post:
 *     summary: Simplify a sentence using AI
 *     tags: [Reader]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sentence:
 *                 type: string
 *               targetLevel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sentence simplified
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/reader/quiz/{bookId}:
 *   get:
 *     summary: Get quiz questions for a book
 *     tags: [Reader]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz questions retrieved
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/reader/quiz/submit:
 *   post:
 *     summary: Submit quiz answers
 *     tags: [Reader]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bookId, answers, score]
 *             properties:
 *               bookId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: string
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description: Quiz submitted
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/achievements:
 *   get:
 *     summary: Get all achievements
 *     tags: [Achievements]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Achievements retrieved
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get platform statistics
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * /api/admin/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, author, difficulty, totalPages]
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               totalPages:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created
 *       403:
 *         description: Admin only
 */

/**
 * @swagger
 * /api/admin/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated
 *       403:
 *         description: Admin only
 *   delete:
 *     summary: Delete a book
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 *       403:
 *         description: Admin only
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *       - name: offset
 *         in: query
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Users retrieved
 *       403:
 *         description: Admin only
 */

/**
 * @swagger
 * /api/admin/users/{userId}/admin:
 *   post:
 *     summary: Make user admin
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User promoted to admin
 *       403:
 *         description: Admin only
 *   delete:
 *     summary: Remove admin privileges
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin privileges removed
 *       403:
 *         description: Admin only
 */

export {}

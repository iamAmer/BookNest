import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { getProfile, updateLevel } from '../controllers/profileController';

const router = Router();

// Profile routes
router.get('/', authenticateJWT, getProfile);
router.patch('/level', authenticateJWT, updateLevel);

export default router;

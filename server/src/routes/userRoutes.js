import express from 'express';
import { getUserProfile, saveUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/profile', protect, getUserProfile);
router.post('/profile', protect, saveUserProfile);

export default router;
import express from 'express';
import { handleChatbotQuery, getChatbotStatus } from '../controllers/chatbotController.js';

const router = express.Router();
router.get('/', getChatbotStatus);
router.post('/', handleChatbotQuery);

export default router;
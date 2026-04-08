import express from 'express';
import { adminLogin, getAdminDashboard } from '../controllers/adminController.js';

const router = express.Router();
router.post('/login', adminLogin);
router.get('/dashboard', getAdminDashboard);

export default router;

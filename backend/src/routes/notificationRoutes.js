import express from 'express';

import {
  getMyNotifications,
  
} from '../controllers/NotificationController.js';

import { verifyToken } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/mynotifications', verifyToken, getMyNotifications);

export default router;
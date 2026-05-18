import express from 'express';

import {
  getMyNotifications,
  markNotificationRead,
  deleteNotification,
  clearNotifications
} from '../controllers/NotificationController.js';

import { verifyToken } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/mynotifications', verifyToken, getMyNotifications);

router.put('/read/:id', verifyToken, markNotificationRead);

router.delete('/delete/:id', verifyToken, deleteNotification);

router.delete('/clearall', verifyToken, clearNotifications);

export default router;
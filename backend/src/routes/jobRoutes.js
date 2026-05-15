import express from 'express';
import { CreateJob, deleteAnyJob, getAllJobsAdmin, getJobs } from '../controllers/jobController.js';
import { verifyToken } from '../middleware/authmiddleware.js';
import { authorizeroles } from '../middleware/roleMiddleware.js';
import { getMyNotifications } from '../controllers/NotificationController.js';

const router = express.Router();
router.post('/createjob',verifyToken,authorizeroles("recruiter"),CreateJob)
router.get('/getJobs',getJobs);
router.get('/mynotifications',verifyToken,getMyNotifications)

export default router;
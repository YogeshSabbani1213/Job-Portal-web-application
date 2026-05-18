import express from 'express';

import {
  CreateJob,
  getJobs,
  getMyJobs,
  updateJob,
  deleteOwnJob,
  closeJob,
  reopenJob,
  recruiterDashboardStats
} from '../controllers/jobController.js';

import { getMyNotifications } from '../controllers/NotificationController.js';

import { verifyToken } from '../middleware/authmiddleware.js';
import { authorizeroles } from '../middleware/roleMiddleware.js';


const router = express.Router();

router.post('/createjob', verifyToken, authorizeroles("recruiter"), CreateJob);

router.get('/getJobs', getJobs);

router.get('/myjobs', verifyToken, authorizeroles("recruiter"), getMyJobs);

router.put('/updatejob/:id', verifyToken, authorizeroles("recruiter"), updateJob);

router.delete('/deletejob/:id', verifyToken, authorizeroles("recruiter"), deleteOwnJob);

router.patch('/closejob/:id', verifyToken, authorizeroles("recruiter"), closeJob);

router.patch('/reopenjob/:id', verifyToken, authorizeroles("recruiter"), reopenJob);

router.get('/dashboardstats', verifyToken, authorizeroles("recruiter"), recruiterDashboardStats);

router.get('/mynotifications', verifyToken, getMyNotifications);

export default router;
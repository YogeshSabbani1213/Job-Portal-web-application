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
import {
  saveJob,
  unsaveJob,
  getSavedJobs
} from '../controllers/jobController.js';

import { getMyNotifications } from '../controllers/NotificationController.js';

import { verifyToken } from '../middleware/authmiddleware.js';
import { authorizeroles } from '../middleware/roleMiddleware.js';


const router = express.Router();

router.post('/createjob', verifyToken, authorizeroles("recruiter"), CreateJob);

router.get('/getJobs', getJobs);

router.post('/savejob/:jobId',verifyToken,authorizeroles('job seeker'),saveJob);

router.delete('/unsavejob/:jobId',verifyToken,authorizeroles('job seeker'),unsaveJob);

router.get('/getsavedjobs',verifyToken,authorizeroles('job seeker'),getSavedJobs);

router.get('/myjobs', verifyToken, authorizeroles("recruiter"), getMyJobs);

router.put('/updatejob/:id', verifyToken, authorizeroles("recruiter"), updateJob);


router.get('/mynotifications', verifyToken, getMyNotifications);

export default router;
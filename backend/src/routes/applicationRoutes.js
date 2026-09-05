import express from 'express';

import {
  ApplyJob,
  getjobApplications,
  getMyApplications,
  updateApplicationStatus,
  withdrawApplication,
  shortlistCandidate,
  rejectCandidate
} from '../controllers/applicationController.js';

import { verifyToken } from '../middleware/authmiddleware.js';

import upload from '../../utils/multer.js';

import { authorizeroles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/applyjob', verifyToken, upload.single('resume'), authorizeroles("job seeker"), ApplyJob);

router.get('/job/:jobId', verifyToken,authorizeroles('recruiter'), getjobApplications);

router.get('/getmyapplications', verifyToken, getMyApplications);

router.put('/status/:applicationId', verifyToken, authorizeroles('recruiter'),updateApplicationStatus);



export default router;
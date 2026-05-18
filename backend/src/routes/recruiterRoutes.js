import express from 'express';
import { verifyToken } from '../middleware/authmiddleware.js';
import { authorizeroles } from '../middleware/roleMiddleware.js';
import { getRecruiterDashboard } from '../controllers/recruiterController.js';
import { getRecruiterJobs } from '../controllers/recruiterController.js';
import { deleteRecruiterJob } from '../controllers/recruiterController.js';

const router = express.Router();

router.get(
    '/dashboard',
    verifyToken,
    authorizeroles('recruiter'),
    getRecruiterDashboard
);
router.get(
    '/myjobs',
    verifyToken,
    authorizeroles('recruiter'),
    getRecruiterJobs
);

router.delete(
    '/deletejob/:id',
    verifyToken,
    authorizeroles('recruiter'),
    deleteRecruiterJob
);
export default router;
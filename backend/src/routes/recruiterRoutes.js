import express from 'express';
import { verifyToken } from '../middleware/authmiddleware.js';
import { authorizeroles } from '../middleware/roleMiddleware.js';
import { getRecruiterDashboard } from '../controllers/recruiterController.js';


const router = express.Router();

router.get(
    '/dashboard',
    verifyToken,
    authorizeroles('recruiter'),
    getRecruiterDashboard
);

export default router;
import express from 'express'
import { verifyToken } from '../middleware/authmiddleware.js';
import { authorizeroles } from '../middleware/roleMiddleware.js';
import { getAllJobsAdmin } from '../controllers/jobController.js';
import { deleteAnyJob } from '../controllers/jobController.js';
import { getAllUsers } from '../controllers/userController.js';
import { deleteUser } from '../controllers/userController.js';

const router = express.Router()
router.get('/getAllJobsAdmin',verifyToken,authorizeroles('admin'),getAllJobsAdmin);
router.delete('/deleteAnyJob/:id',verifyToken,authorizeroles('admin'),deleteAnyJob);

router.get('/getAllUsers',verifyToken,authorizeroles('admin'),getAllUsers);
router.delete('/deleteUser/:id',verifyToken,authorizeroles('admin'),deleteUser);

export default router;
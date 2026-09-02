import express from 'express'
import { deleteUser, getAllUsers, login, register } from '../controllers/userController.js';
import upload from '../../utils/multer.js';
import { verifyToken } from '../middleware/authmiddleware.js';
import { authorizeroles } from '../middleware/roleMiddleware.js';
import { googleLogin } from '../controllers/userController.js'
const router = express.Router();

router.post('/register',upload.single("resume"),register);
router.post('/login',login)
router.post('/google', googleLogin)



export default router;
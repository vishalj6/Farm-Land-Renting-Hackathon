import express from 'express';
import userRoute from './user.routes.js';
import authRoute from './auth.routes.js';
import landRoute from './land.routes.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', authenticateToken, userRoute);
router.use('/lands', authenticateToken, landRoute);

export default router;

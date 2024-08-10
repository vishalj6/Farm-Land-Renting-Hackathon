import express from 'express';
import userRoute from './user.routes.js';
import authRoute from './auth.routes.js';

const router = express.Router();

// Define all the routes here
router.use('/auth',authRoute);

export default router;

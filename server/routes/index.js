import express from 'express';
import userRoute from './user.routes.js';

const router = express.Router();

// Define all the routes here
router.use('/user',userRoute);

export default router;

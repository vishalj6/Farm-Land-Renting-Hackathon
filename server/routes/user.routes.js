import express from 'express';
import { signUpUser, loginUser } from '../controllers/auth.controller.js';
import { getUser, updateUser } from '../controllers/user.controller.js';

const userRoute = express.Router();

// User Sign-Up Route
userRoute.get('/user/:userId', getUser);

// User Login Route
userRoute.put('/user', updateUser);

export default userRoute;

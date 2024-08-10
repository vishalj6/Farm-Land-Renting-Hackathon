import express from 'express';
import { signUpUser, loginUser } from '../controllers/auth.controller.js';

const userRoute = express.Router();

// User Sign-Up Route
userRoute.post('/signup', signUpUser);

// User Login Route
userRoute.post('/login', loginUser);

export default userRoute;

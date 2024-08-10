import express from 'express';
import { signUpUser, loginUser } from '../controllers/auth.controller.js';

const authRoute = express.Router();

// User Sign-Up Route
authRoute.post('/signup', signUpUser);

// User Login Route
authRoute.post('/login', loginUser);

export default authRoute;

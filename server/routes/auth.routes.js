import express from 'express';
import { signUpUser, loginUser } from '../controllers/auth.controller.js';

const authRoute = express.Router();

authRoute.post('/signup', signUpUser);
authRoute.post('/login', loginUser);

export default authRoute;

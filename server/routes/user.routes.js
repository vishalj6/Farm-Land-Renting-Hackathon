import express from 'express';
import { getUser, updateUser } from '../controllers/user.controller.js';

const userRoute = express.Router();

userRoute.get('/:userId', getUser);

userRoute.put('/update/:userId', updateUser);

export default userRoute;

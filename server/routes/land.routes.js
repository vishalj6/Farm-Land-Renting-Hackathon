import express from 'express';
import { addLand, getLand, listLands, updateLand } from '../controllers/land.controller';
const landRoute = express.Router();

// User Sign-Up Route
landRoute.post('/add', addLand);

// User Login Route
landRoute.put('/update/:landId', updateLand);

landRoute.get('/land/:landId', getLand);

landRoute.get('/lands',listLands);

export default landRoute;

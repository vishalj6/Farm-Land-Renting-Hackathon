import express from 'express';
import { addLand, getLand, listLands, updateLand } from '../controllers/land.controller.js';
const landRoute = express.Router();

landRoute.post('/add', addLand);
landRoute.put('/update/:landId', updateLand);
landRoute.get('/:landId', getLand);
landRoute.get('/lands', listLands);

export default landRoute;

import express from 'express';
import { wishlistCreate } from '../controller/wishlistcontroller.js';
const route = express.Router();

route.post('/get', wishlistCreate);

export default route;



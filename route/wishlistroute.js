import express from 'express';
import { wishlistCreate, wishlistget } from '../controller/wishlistcontroller.js';

const route = express.Router();

route.post("/getwishlist", wishlistget);
route.post('/get', wishlistCreate);

export default route;




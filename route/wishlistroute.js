import express from 'express';
import { wishlistCreate, wishlistget } from '../controller/wishlistcontroller.js';
const route = express.Router();

route.post('/get', wishlistCreate);
route.get("/getwishlist", wishlistget);

export default route;



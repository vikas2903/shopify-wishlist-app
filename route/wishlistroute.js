import express from 'express';
import { wishlistCreate, wishlistget, wishlitremove } from '../controller/wishlistcontroller.js';

const route = express.Router();

route.post("/getwishlist", wishlistget);
route.post('/get', wishlistCreate);
route.post("/remove", wishlitremove);

export default route;




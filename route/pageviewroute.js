// routes/pageviewsroutes.js
import express from 'express';

import { trackPageView, trackAddToCart } from '../controller/pageviewcontroller.js';
import { getPageViews, deletePageViewsByShopAndDate } from '../controller/pageviewcontroller.js';

const pageviewsroutes = express.Router();

pageviewsroutes.post('/track-view', trackPageView); 

pageviewsroutes.get("/data", getPageViews)

pageviewsroutes.delete("/delete", deletePageViewsByShopAndDate);

pageviewsroutes.post('/track-add-to-cart', trackAddToCart);

export default pageviewsroutes;

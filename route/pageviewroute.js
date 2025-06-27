// // routes/pageviewsroutes.js
// import express from 'express';

// import { trackPageView, trackCheckoutClick } from '../controller/pageviewcontroller.js';
// import { getPageViews, deletePageViewsByShopAndDate } from '../controller/pageviewcontroller.js';

// const pageviewsroutes = express.Router();

// pageviewsroutes.post('/track-view', trackPageView); 

// pageviewsroutes.get("/data", getPageViews)

// pageviewsroutes.delete("/delete", deletePageViewsByShopAndDate);

// pageviewsroutes.post('/track-add-to-cart', trackCheckoutClick);


// export default pageviewsroutes;


import express from 'express';
import {
  trackPageView,
  trackAddToCartClick,
  trackCheckoutClick,
  getPageViews,
  deletePageViewsByShopAndDate,
  deletePageView
} from '../controller/pageviewcontroller.js';

const pageviewsroutes = express.Router();

// ✅ Track views
pageviewsroutes.post('/track-view', trackPageView);

// ✅ Track Add to Cart clicks
pageviewsroutes.post('/track-add-to-cart', trackAddToCartClick);

// ✅ Track Checkout clicks
pageviewsroutes.post('/track-checkout', trackCheckoutClick);

// ✅ Get page views for a shop and date
pageviewsroutes.get('/data', getPageViews);

// ✅ Delete all views for a shop and date
pageviewsroutes.delete('/delete', deletePageViewsByShopAndDate);

// 🧪 Optional: Delete a single entry
pageviewsroutes.delete('/delete-one', deletePageView);

export default pageviewsroutes;

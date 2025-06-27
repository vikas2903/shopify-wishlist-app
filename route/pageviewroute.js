// routes/pageviewsroutes.js
import express from 'express';

import { trackPageView } from '../controller/pageviewcontroller.js';
import { getPageViews } from '../controller/pageviewcontroller.js';

const pageviewsroutes = express.Router();

pageviewsroutes.post('/track-view', trackPageView); 

pageviewsroutes.get("/data", getPageViews)
export default pageviewsroutes;

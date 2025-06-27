// routes/pageviewsroutes.js
import express from 'express';

import { trackPageView } from '../controller/pageviewcontroller.js';

const pageviewsroutes = express.Router();

pageviewsroutes.post('/track-view', trackPageView); 

export default pageviewsroutes;

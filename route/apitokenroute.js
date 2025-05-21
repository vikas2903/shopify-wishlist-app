import express from 'express';

import {redirectToShopify, handleCallback} from '../controller/apitokencontroller.js';

const apitokenroute = express.Router();
apitokenroute.get("/auth", redirectToShopify);
apitokenroute.post("/auth/callback", handleCallback);


export default apitokenroute;
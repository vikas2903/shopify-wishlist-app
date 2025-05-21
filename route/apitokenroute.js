import express from 'express';

import {redirectToShopify, handleCallback} from '../controller/apitokencontroller.js';

const apitokenroute = express.Router();
apitokenroute.get("/auth", redirectToShopify);
apitokenroute.get("/auth/callback", handleCallback);


export default apitokenroute;
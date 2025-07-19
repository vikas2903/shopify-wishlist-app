import express from 'express';
const cartroute = express.Router();
import getData from '../controller/cardscontroller.js'

cartroute.get('/carditems', getData);

export default cartroute;
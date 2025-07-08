import express from 'express';
import { trackingvisitors } from '../controller/visitorscontroller.js';

const visitorroute = express.Router();

visitorroute.post('/events', trackingvisitors)

export default visitorroute;
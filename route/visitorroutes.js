import express from 'express';
import { trackingvisitors, visitoresdata } from '../controller/visitorscontroller.js';

const visitorroute = express.Router();

visitorroute.post('/events', trackingvisitors);
visitorroute.get('/visitors', visitoresdata);


export default visitorroute;
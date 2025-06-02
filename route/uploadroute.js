import express from 'express';
import uploadBlockSection from '../controller/uploadcontroller.js';

const uploadroute = express.Router();

// Upload section route
uploadroute.post('/upload-section', uploadBlockSection);

export default uploadroute; 
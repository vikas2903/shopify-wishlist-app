import express from 'express';
import uploadBlockSection from '../controller/uploadBlockSection.js';

const uploadroute = express.Router();

uploadroute.post('/section', uploadBlockSection);

export default uploadroute;
const express = require('express');

import  {uploadBlockSection} from '../controller/uploadBlockSection.js';

const uploadroute = express.Router();

uploadroute.post('/section', uploadBlockSection);

module.exports = uploadroute;

const express = require('express');

import  {uploadSlideshowSection} from ('../controller/uploadBlockSection.js');

const uploadroute = express.Router();

uploadroute.post('/section', uploadSlideshowSection);

module.exports = uploadroute;

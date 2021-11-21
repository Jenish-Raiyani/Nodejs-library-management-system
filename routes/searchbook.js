const express = require('express');
const router = express.Router();

const searchapi = require('../controllers/searchapi');
router.post('/searchresult',searchapi.searchresult);
router.post('/getbook',searchapi.getsearchedbook);





module.exports= router;
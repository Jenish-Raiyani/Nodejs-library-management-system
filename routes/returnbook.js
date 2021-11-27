const express = require('express');
const router = express.Router();

const returnbook = require('../controllers/returnbook');
router.get('/returnnbookdetails',returnbook.getnotreturnbook);
router.post('/addreturnbookdetails',returnbook.addreturnbook);
router.get('/viewreturnbook',returnbook.getreturnbooklist);


// router.post('/getbook',searchapi.getsearchedbook);





module.exports= router;
const express = require('express');
const router = express.Router();
const issuedetails = require('../controllers/issuebook');
router.get('/issuebook',issuedetails.addissuedbook)
router.get('/issuebook/addDetails/:id',issuedetails.getformbookdetials)
router.post('/getbook',issuedetails.getbook)
router.post('/searchbook',issuedetails.getsearchedbook)
router.post('/issuebook/addDetails/:id',issuedetails.submitdetails)
router.get('/viewissuebooklist',issuedetails.getlist)



module.exports= router;
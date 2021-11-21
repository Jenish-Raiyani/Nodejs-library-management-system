const express = require('express');
const router = express.Router();

const bookController = require('../controllers/addbook');
router.post('/',bookController.books)
 

module.exports= router;
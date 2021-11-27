const express = require('express');
const router = express.Router();

const members = require('../controllers/managemembers');
router.get('/members',members.memberslist)
router.post('/addmember/',members.addmember)
router.get('/addmember',members.adddetails)

module.exports= router;
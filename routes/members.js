const express = require('express');
const router = express.Router();

const members = require('../controllers/managemembers');
router.get('/members',members.memberslist);
router.post('/addmember/',members.addmember);
router.get('/addmember',members.adddetails);
router.get('/members/deletemember/:id',members.deletemember);
router.get('/members/getmemdetails/:id',members.getmemdetails);
router.post('/members/getmemdetails/:id',members.updatemember);


module.exports= router;
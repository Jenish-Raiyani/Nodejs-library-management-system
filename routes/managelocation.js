const express = require('express');
const router = express.Router();

const locationController = require('../controllers/managelocation');


router.get('/booklocation/updatelocation/:id',locationController.booklocation);

router.post('/booklocation/updatelocation/:id',locationController.updatebooklocation)

router.get('/booklocation/managelocation/:id',locationController.getbook)
router.post('/booklocation/managelocation/:id',locationController.addlocation)
//router.post('/login',authController.login)





module.exports= router;
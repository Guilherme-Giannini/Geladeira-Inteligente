

const express = require('express');
const router = express.Router();


const upload = require('../middlewares/upload');


const scanController = require('../controllers/scanController');


router.post('/scan', upload.single('image'), scanController.receiveScan);

module.exports = router;
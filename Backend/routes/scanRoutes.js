const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload');
const scanController = require('../controllers/scanController');

// Upload de uma única imagem no campo 'image'
router.post('/scan', upload.single('image'), scanController.receiveScan);

module.exports = router;
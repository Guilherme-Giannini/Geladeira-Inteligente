const express = require('express');
const router = express.Router();
const ItemsController = require('../controllers/itemsController');

router.get('/', ItemsController.list);
router.post('/', ItemsController.add);

module.exports = router;

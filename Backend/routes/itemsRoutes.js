const express = require('express');
const router = express.Router();
const ItemsController = require('../controllers/itensController');


router.get('/', ItemsController.list);


router.post('/', ItemsController.add);


router.put('/:id', ItemsController.update);


router.delete('/:id', ItemsController.delete);

module.exports = router;
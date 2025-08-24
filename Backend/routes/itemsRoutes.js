const express = require('express');
const router = express.Router();
const ItemsController = require('../controllers/itensController');


router.get('/', ItemsController.list);
router.post('/', ItemsController.add);
router.put('/:id', ItemsController.update);
router.delete('/:id', ItemsController.delete);


router.post('/photo', ItemsController.addFromPhoto);   
router.get('/last', ItemsController.getLastItems);    

router.get('/inventory', ItemsController.list);

module.exports = router;

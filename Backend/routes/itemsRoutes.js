const express = require('express');
const router = express.Router();
const ItemsController = require('../controllers/itensController');


router.get('/', ItemsController.list);              
router.post('/', ItemsController.add);            
router.put('/:id', ItemsController.update);     
router.delete('/:id', ItemsController.delete);     
router.put('/:id/min', ItemsController.updateMin);


router.post('/photo', ItemsController.addFromPhoto);
router.get('/last', ItemsController.getLastItems);
router.get('/tobuy', ItemsController.getToBuy);  

module.exports = router;
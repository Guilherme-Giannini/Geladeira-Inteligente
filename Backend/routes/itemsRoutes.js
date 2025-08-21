const express = require('express');
const router = express.Router();
const ItemsController = require('../controllers/itensController');

// Listar itens
router.get('/', ItemsController.list);

// Adicionar item
router.post('/', ItemsController.add);

// Atualizar item
router.put('/:id', ItemsController.update);

// Deletar item
router.delete('/:id', ItemsController.delete);

module.exports = router;
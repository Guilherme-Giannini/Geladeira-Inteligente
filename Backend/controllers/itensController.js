const Items = require('../models/itemsModel');

const ItemsController = {

  list: async (req, res) => {
    try {
      const items = await Items.getAll();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar itens.' });
    }
  },

 
  add: async (req, res) => {
    try {
      const { user_id, name, quantity, min_quantity } = req.body;
      const result = await Items.create(user_id, name, quantity, min_quantity || 0);
      res.json({ message: 'Item adicionado', id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao adicionar item.' });
    }
  },

  
  addFromPhoto: async (req, res) => {
    try {
      const { user_id, items } = req.body;
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Nenhum item fornecido.' });
      }

      const newPhotoId = await Items.addFromPhoto(user_id, items);

      res.json({
        message: 'Itens adicionados da foto',
        photo_id: newPhotoId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao adicionar itens da foto.' });
    }
  },


  getLastItems: async (req, res) => {
    try {
      const rows = await Items.getLast();
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar últimos itens.' });
    }
  },

 
  updateMin: async (req, res) => {
    try {
      const { id } = req.params;
      const { min_quantity } = req.body;
      const result = await Items.updateMinQuantity(id, min_quantity);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Item não encontrado.' });
      }

      res.json({ message: 'Quantidade mínima atualizada com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar quantidade mínima.' });
    }
  },


  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, quantity } = req.body;
      const result = await Items.update(id, name, quantity);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Item não encontrado.' });
      }

      res.json({ message: 'Item atualizado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar item.' });
    }
  },


  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Items.delete(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Item não encontrado.' });
      }

      res.json({ message: 'Item removido com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao remover item.' });
    }
  },


  getToBuy: async (req, res) => {
    try {
      const items = await Items.getToBuy();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar itens para compra.' });
    }
  }
};

module.exports = ItemsController;
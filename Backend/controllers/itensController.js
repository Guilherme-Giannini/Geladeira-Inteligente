const db = require('../models/db'); // certifique-se que é o db correto
const Items = require('../models/itemsModel');

const ItemsController = {
  // Listar todos os itens
  list: async (req, res) => {
    try {
      const items = await Items.getAll();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar itens.' });
    }
  },

  // Adicionar novo item
  add: async (req, res) => {
    try {
      const { user_id, name, quantity } = req.body;
      const result = await Items.create(user_id, name, quantity);
      res.json({ message: 'Item adicionado', id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao adicionar item.' });
    }
  },

  // Atualizar item existente
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, quantity } = req.body;

      const [result] = await db.query(
        'UPDATE items SET name = ?, quantity = ? WHERE id = ?',
        [name, quantity, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Item não encontrado.' });
      }

      res.json({ message: 'Item atualizado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar item.' });
    }
  },

  // Deletar item
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const [result] = await db.query('DELETE FROM items WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Item não encontrado.' });
      }

      res.json({ message: 'Item removido com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao remover item.' });
    }
  }
};

module.exports = ItemsController;
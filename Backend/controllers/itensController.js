const db = require('../models/db'); 
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
      const { user_id, name, quantity } = req.body;
      const result = await Items.create(user_id, name, quantity);
      res.json({ message: 'Item adicionado', id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao adicionar item.' });
    }
  },

  addFromPhoto: async (req, res) => {
    try {
      const { user_id, items } = req.body; // items = [{ name, quantity }, ...]
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Nenhum item fornecido.' });
      }

   
      const [[last]] = await db.query("SELECT MAX(photo_id) as max FROM items");
      const newPhotoId = (last.max || 0) + 1;

      for (const item of items) {
        await db.query(
          "INSERT INTO items (user_id, name, quantity, photo_id) VALUES (?, ?, ?, ?)",
          [user_id, item.name, item.quantity, newPhotoId]
        );
      }

      res.json({ message: 'Itens adicionados da foto', photo_id: newPhotoId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao adicionar itens da foto.' });
    }
  },


  getLastItems: async (req, res) => {
    try {
      const [[last]] = await db.query("SELECT MAX(photo_id) as max FROM items");
      if (!last.max) return res.json([]);

      const [rows] = await db.query(
        "SELECT * FROM items WHERE photo_id = ?",
        [last.max]
      );

      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar últimos itens.' });
    }
  },

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
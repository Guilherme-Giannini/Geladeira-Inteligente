const Items = require('../models/itemsModel');

const ItemsController = {
  list: async (req, res) => {
    const items = await Items.getAll();
    res.json(items);
  },

  add: async (req, res) => {
    const { user_id, name, quantity } = req.body;
    const result = await Items.create(user_id, name, quantity);
    res.json({ message: 'Item adicionado', id: result.insertId });
  }
};

module.exports = ItemsController;
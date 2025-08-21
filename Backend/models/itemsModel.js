const db = require('./db');

const Items = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM items');
    return rows;
  },

  create: async (user_id, name, quantity) => {
    const [result] = await db.query(
      'INSERT INTO items (user_id, name, quantity) VALUES (?, ?, ?)',
      [user_id, name, quantity]
    );
    return result;
  }
};

module.exports = Items;
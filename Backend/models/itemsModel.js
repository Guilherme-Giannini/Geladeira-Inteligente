const db = require('./db');

const Items = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM items');
    return rows;
  },

  
  create: async (user_id, name, quantity) => {
   
    const [[last]] = await db.query("SELECT MAX(photo_id) as max FROM items");
    const newPhotoId = (last.max || 0) + 1;

    const [result] = await db.query(
      'INSERT INTO items (user_id, name, quantity, photo_id) VALUES (?, ?, ?, ?)',
      [user_id, name, quantity, newPhotoId]
    );
    return result;
  },

  addFromPhoto: async (user_id, items) => {
    const [[last]] = await db.query("SELECT MAX(photo_id) as max FROM items");
    const newPhotoId = (last.max || 0) + 1;

    for (const item of items) {
      await db.query(
        "INSERT INTO items (user_id, name, quantity, photo_id) VALUES (?, ?, ?, ?)",
        [user_id, item.name, item.quantity, newPhotoId]
      );
    }

    return newPhotoId;
  },

  getLast: async () => {
    const [[last]] = await db.query("SELECT MAX(photo_id) as max FROM items");
    if (!last.max) return [];

    const [rows] = await db.query(
      "SELECT * FROM items WHERE photo_id = ?",
      [last.max]
    );
    return rows;
  }
};

module.exports = Items;
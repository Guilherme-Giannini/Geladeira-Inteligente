const db = require('./db');

const Items = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM items');
    return rows;
  },

  create: async (user_id, name, quantity, min_quantity = 0) => {

    const [photoResult] = await db.query("INSERT INTO photos () VALUES ()");
    const newPhotoId = photoResult.insertId;

    const [result] = await db.query(
      'INSERT INTO items (user_id, name, quantity, min_quantity, photo_id) VALUES (?, ?, ?, ?, ?)',
      [user_id, name, quantity, min_quantity, newPhotoId]
    );
    return result;
  },

  addFromPhoto: async (user_id, items) => {
    if (!Array.isArray(items) || items.length === 0) return null;


    const [photoResult] = await db.query("INSERT INTO photos () VALUES ()");
    const newPhotoId = photoResult.insertId;


    const insertPromises = items.map(item =>
      db.query(
        "INSERT INTO items (user_id, name, quantity, min_quantity, photo_id) VALUES (?, ?, ?, ?, ?)",
        [user_id, item.name, item.quantity, item.min_quantity || 0, newPhotoId]
      )
    );
    await Promise.all(insertPromises);

    return newPhotoId;
  },

  getLast: async () => {

    const [lastPhoto] = await db.query(
      "SELECT photo_id FROM items ORDER BY photo_id DESC LIMIT 1"
    );

    if (!lastPhoto.length) return []; 

    const lastPhotoId = lastPhoto[0].photo_id;

    const [rows] = await db.query(
      "SELECT * FROM items WHERE photo_id = ?",
      [lastPhotoId]
    );

    return rows;
  },

  updateMinQuantity: async (id, min_quantity) => {
    const [result] = await db.query(
      "UPDATE items SET min_quantity = ? WHERE id = ?",
      [min_quantity, id]
    );
    return result;
  },

  update: async (id, name, quantity) => {
    const [result] = await db.query(
      "UPDATE items SET name = ?, quantity = ? WHERE id = ?",
      [name, quantity, id]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await db.query(
      "DELETE FROM items WHERE id = ?",
      [id]
    );
    return result;
  },

  getToBuy: async () => {
    const [rows] = await db.query(
      "SELECT * FROM items WHERE quantity < min_quantity"
    );
    return rows;
  }
};

module.exports = Items;
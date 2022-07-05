const db = require('./db');

const productsModel = {
  getAll: async () => {
    const sql = 'SELECT * FROM StoreManager.products';
    const [result] = await db.query(sql);
    return result;
  },
  
  getById: async (id) => {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[result]] = await db.query(sql, [id]);
    return result;
  },
  
  add: async (product) => {
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [result] = await db.query(sql, [product.name]);
    return result;
  },
};

module.exports = productsModel;
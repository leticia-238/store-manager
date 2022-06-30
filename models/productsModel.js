const db = require('./db');

const productsModel = {
  list: async () => {
    const sql = 'SELECT * FROM StoreManager.products';
    const [result] = await db.query(sql);
    return result;
  },
  
  get: async (id) => {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[result]] = await db.query(sql, [id]);
    return result;
  },
};

module.exports = productsModel;
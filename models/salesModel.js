const db = require('./db');

const salesModel = {
  getByIds: async (ids) => {
    const sql = 'SELECT * FROM StoreManager.products WHERE id IN (?)';
    const [result] = await db.query(sql, [ids]);
    return result;
  },
  
  add: async (products) => {
    const sqlSales = 'INSERT INTO StoreManager.sales (date) VALUES (?)';
    const [{ insertId }] = await db.query(sqlSales, [undefined]);
    
    const values = products
      .map(({ productId, quantity }) => ([insertId, productId, quantity]));
    
    const sqlSalesProducts = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES ?
    `;
    
    await db.query(sqlSalesProducts, [values]);
    return insertId;
  },
};

module.exports = salesModel;
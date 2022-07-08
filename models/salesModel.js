const db = require('./db');

const salesModel = {
  getAllSales: async () => {
    const sql = `
      SELECT 
        sales.id AS saleId,
        sales.date,
        sales_products.product_id AS productId,
        sales_products.quantity
      FROM StoreManager.sales AS sales
      RIGHT JOIN StoreManager.sales_products AS sales_products 
      ON sales.id = sales_products.sale_id
      ORDER BY sale_id ASC, product_id ASC;
    `;
    const [result] = await db.query(sql);
    return result;
  },
  
  getSaleById: async (id) => {
    const sql = `
      SELECT 
        sales.date,
        sales_products.product_id AS productId,
        sales_products.quantity 
      FROM StoreManager.sales AS sales
      RIGHT JOIN StoreManager.sales_products AS sales_products 
      ON sales.id = sales_products.sale_id
      WHERE sale_id = ?
      ORDER BY product_id ASC;
    `;
    const [result] = await db.query(sql, [id]);
    return result;
  },
  
  getProductsByIds: async (ids) => {
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
const productsService = require('../services/productsService');

const productsController = {
  getAll: async (_req, res) => {
    const products = await productsService.getAll();
    res.json(products);
  },
  
  getById: async (req, res) => {
    const { id } = await productsService.validateId(req.params);
    const product = await productsService.getById(id);
    res.json(product);
  },
};

module.exports = productsController;
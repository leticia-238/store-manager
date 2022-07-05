const productsService = require('../services/productsService');

const productsController = {
  getAll: async (_req, res) => {
    const products = await productsService.getAll();
    res.status(200).json(products);
  },
  
  getById: async (req, res) => {
    const { id = undefined } = req.params;
    await productsService.validateId(id);
    const product = await productsService.getById(id);
    res.status(200).json(product);
  },
  
  add: async (req, res) => {
    const product = req.body;
    await productsService.validateProduct(product);
    const savedProduct = await productsService.add(product);
    res.status(201).json(savedProduct);
  },
};

module.exports = productsController;
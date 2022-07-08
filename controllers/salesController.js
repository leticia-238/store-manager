const salesService = require('../services/salesService');

const salesController = {
  getAll: async (_req, res) => {
    const sales = await salesService.getAll();
    res.status(200).json(sales);
  },
  
  getById: async (req, res) => {
    const { id = undefined } = req.params;
    await salesService.validateId(id);
    const sale = await salesService.getById(id);
    res.status(200).json(sale);
  },
  
  add: async (req, res) => {
    const products = req.body;
    await salesService.validateProducts(products);
    const savedProducts = await salesService.add(products);
    res.status(201).json(savedProducts);
  },
};

module.exports = salesController;
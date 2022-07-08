const salesService = require('../services/salesService');

const salesController = {
  add: async (req, res) => {
    const products = req.body;
    await salesService.validateProducts(products);
    const savedProducts = await salesService.add(products);
    res.status(201).json(savedProducts);
  },
};

module.exports = salesController;
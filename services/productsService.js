const Joi = require('joi');
const productsModel = require('../models/productsModel');
const NotFoundError = require('../errors/NotFoundError');

const productsService = {
  listAll: async () => {
    const products = await productsModel.list();
    return products;
  },
  
  getById: async (id) => {
    const product = await productsModel.get(id);
    if (!product) throw new NotFoundError('Product not found');
    return product;
  },
  
  validateId: async (value) => {
    const schema = Joi.object({
      id: Joi.number().required().positive().integer(),
    }).required();
    const result = await schema.validateAsync(value);
    return result;
  },
};

module.exports = productsService;
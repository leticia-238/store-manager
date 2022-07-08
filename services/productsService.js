const Joi = require('joi');
const productsModel = require('../models/productsModel');
const NotFoundError = require('../errors/NotFoundError');
const handleJoiError = require('./helpers/handleJoiError');

const productsService = {
  getAll: async () => {
    const products = await productsModel.getAll();
    return products;
  },
  
  getById: async (id) => {
    const product = await productsModel.getById(id);
    if (!product) throw new NotFoundError('Product not found');
    return product;
  },
  
  add: async (product) => {
    const { insertId } = await productsModel.add(product);
    const savedProduct = { ...product, id: insertId };
    return savedProduct;
  },
  
  validateId: async (id) => {
    const schema = Joi.number().required().positive().integer();
    const result = await schema.validateAsync(id);
    return result;
  },
  
  validateProduct: async (product) => {
    const schema = Joi.object({
      name: Joi.string().required().min(5).error(handleJoiError),
    });
    
    const result = await schema.validateAsync(product);
    return result;
  },
};

module.exports = productsService;
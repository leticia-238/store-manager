const Joi = require('joi');
const productsModel = require('../models/productsModel');
const NotFoundError = require('../errors/NotFoundError');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');

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
    const schema = Joi.object({
      id: Joi.number().required().positive().integer(),
    }).required();
    const result = await schema.validateAsync({ id });
    return result;
  },
  
  validateProduct: async (product) => {
    const schema = Joi.object({
      name: Joi.string().required().min(5).error((error) => {
        const [{ code }] = error;
        if (code === 'string.min') return new UnprocessableEntityError(error);
        return error;
      }),
    });
    
    const result = await schema.validateAsync(product);
    return result;
  },
};

module.exports = productsService;
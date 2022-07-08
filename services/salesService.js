const Joi = require('joi');
const NotFoundError = require('../errors/NotFoundError');
const salesModel = require('../models/salesModel');
const handleJoiError = require('./helpers/handleJoiError');

const salesService = {
  add: async (products) => {
    const productsIds = products.map(({ productId }) => (productId));
    const result = await salesModel.getByIds(productsIds);
    
    if (result.length !== products.length) {
      throw new NotFoundError('Product not found');
    }
    
    const id = await salesModel.add(products);
    const savedProducts = { id, itemsSold: products };
    return savedProducts;
  },
  
  validateProducts: async (products) => {
    const message = '"quantity" must be greater than or equal to 1'; 
    
    const schema = Joi.array().items(
      Joi.object({
        productId: Joi.number().required().label('productId'),
        quantity: Joi.number().required().min(1).message(message)
          .label('quantity')
          .error(handleJoiError),
      }),
    );
    
    const result = await schema.validateAsync(products);
    return result;
  },
};

module.exports = salesService;
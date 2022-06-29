const productsModel = require('../models/productsModel')
const Joi = require('joi');

const productsService = {
  listAll: async () => {
    const products = await productsModel.list()
    return products
  },
  
  getById: async (id) => {
    const [product] = await productsModel.get(id)
    return product
  },
  
  validateId: async (value) => {
    const schema = Joi.object({
      id: Joi.number().required().positive().integer()
    }).required()
    const result = await schema.validateAsync(value)
    return result
  }
}

module.exports = productsService
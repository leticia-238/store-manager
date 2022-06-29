const productsModel = require('../models/productsModel')

const productsService = {
  listAll: async () => {
    const products = await productsModel.list()
    return products
  },
  
  getById: async (id) => {
    const [product] = await productsModel.get(id)
    return product
  }
}

module.exports = productsService
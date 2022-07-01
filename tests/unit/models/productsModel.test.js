const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const db = require('../../../models/db');

const { PRODUCTS_LIST, PRODUCT } = require('../data');
  
describe('Teste unitário do productsModel', () => {
  afterEach(sinon.restore);
  
  describe('lista todos os produtos', () => {
    it('deve retornar uma lista com todos os produtos', async () => {
      sinon.stub(db, 'query').resolves([PRODUCTS_LIST]);
      const result = await productsModel.getAll();
      expect(result).to.be.deep.equal(PRODUCTS_LIST);
    });
  });
  
  describe('retorna o produto procurado pelo id', () => {
    it('deve retornar o produto se ele for encontrado', async () => {
      sinon.stub(db, 'query').resolves([[PRODUCT]]);
      const result = await productsModel.getById(PRODUCT.id);
      expect(result).to.be.deep.equal(PRODUCT);
    });
    
    it('deve retornar undefined se o produto não for encontrado', async () => {
      sinon.stub(db, 'query').resolves([[]]);
      const result = await productsModel.getById(PRODUCT.id);
      expect(result).to.be.undefined;
    });
  });
});

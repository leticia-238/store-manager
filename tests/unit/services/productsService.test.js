const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFoundError');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

const {
  PRODUCTS_LIST,
  PRODUCT, NEW_PRODUCT,
  INSERT_ID,
  SAVED_PRODUCT } = require('../data/productsData');

chai.use(chaiAsPromised);

const { expect } = chai;

const NON_EXISTENT_ID = 91;

describe('Teste unitário do productsService', () => {
  afterEach(sinon.restore);
  
  describe('lista todos os produtos', () => {
    it('deve retornar uma lista com todos os produtos', async () => {
      sinon.stub(productsModel, 'getAll').resolves(PRODUCTS_LIST);
      const result = await productsService.getAll();
      expect(result).to.be.deep.equal(PRODUCTS_LIST);
    });
  });
  
  describe('retorna o produto procurado pelo id', () => {
    it('deve retornar o produto se ele for encontrado', async () => {
      sinon.stub(productsModel, 'getById').resolves(PRODUCT);
      const result = await productsService.getById(PRODUCT.id);
      expect(result).to.be.deep.equal(PRODUCT);
    });
    
    it('deve disparar um erro se o produto não for encontrado', async () => {
      sinon.stub(productsModel, 'getById').resolves(undefined);
      
      return expect(productsService.getById(NON_EXISTENT_ID))
        .to.eventually.be.rejectedWith(NotFoundError);
    });
  });
  
  describe('adiciona um novo produto', () => {
    it('deve retornar o produto adicionado', async () => {
      sinon.stub(productsModel, 'add').resolves({ insertId: INSERT_ID });
      const result = await productsService.add(NEW_PRODUCT);
      expect(result).to.be.deep.equal(SAVED_PRODUCT);
    });
  });
});

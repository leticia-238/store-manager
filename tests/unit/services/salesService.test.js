const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFoundError');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

const { SALES_LIST, SALE, SALES_PRODUCTS, PRODUCTS_LIST,
  SAVED_SALE, INSERT_ID } = require('../data');

chai.use(chaiAsPromised);

const { expect } = chai;

const NON_EXISTENT_ID = 91;

describe('Teste unitário do salesService', () => {
  afterEach(sinon.restore);
  
  describe('lista todas as vendas', () => {
    it('deve retornar uma lista com todas as vendas', async () => {
      sinon.stub(salesModel, 'getAllSales').resolves(SALES_LIST);
      const result = await salesService.getAll();
      expect(result).to.be.deep.equal(SALES_LIST);
    });
  });
  
  describe('retorna a venda procurada pelo id', () => {
    it('deve retornar a venda se ela for encontrada', async () => {
      sinon.stub(salesModel, 'getSaleById').resolves(SALE);
      const result = await salesService.getById();
      expect(result).to.be.deep.equal(SALE);
    });
    
    it('deve disparar um erro se a venda não for encontrada', async () => {
      sinon.stub(salesModel, 'getSaleById').resolves([]);
      
      return expect(salesService.getById(NON_EXISTENT_ID))
        .to.eventually.be.rejectedWith(NotFoundError);
    });
  });
  
  describe('adiciona uma nova venda', () => {
    it('deve retornar o produto ou os produtos que foram adicionados na venda',
    async () => {
      sinon.stub(salesModel, 'getProductsByIds').resolves(PRODUCTS_LIST);
      sinon.stub(salesModel, 'add').resolves(INSERT_ID);
      
      const result = await salesService.add(SALES_PRODUCTS);
      expect(result).to.be.deep.equal(SAVED_SALE);
    });
    
    it('deve disparar um erro se algum produto da venda não for encontrado',
    async () => {
      sinon.stub(salesModel, 'getProductsByIds').resolves([]);
      
      return expect(salesService.add(SALES_PRODUCTS))
        .to.eventually.be.rejectedWith(NotFoundError);
    });
  });
});

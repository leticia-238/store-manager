const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productsService = require('../../../services/productsService');
const salesService = require('../../../services/salesService');

const { SALES_PRODUCTS } = require('../data/salesData');

chai.use(chaiAsPromised);

const { expect } = chai;

const VALID_ID = 1;
const INVALID_ID = 'a';
const VALID_PRODUCT = { name: 'ProductX' };
const INVALID_PRODUCT = { name: '' };

const INVALID_SALE_PRODUCTS = [
  { productId: 1, quantity: 0 },
];

describe('Teste unitário das funções de validação', () => {
  describe('Validação do productsService', () => {
    it('deve retornar o id se ele passar na validação', async () => (
      expect(productsService.validateId(VALID_ID))
        .to.eventually.be.fulfilled
    ));
    
    it('deve disparar um erro se o id for inválido', async () => (
      expect(productsService.validateId(INVALID_ID))
        .to.eventually.be.rejected
    ));
    
    it('deve retornar o produto se ele passar na validação', async () => (
      expect(productsService.validateProduct(VALID_PRODUCT))
        .to.eventually.be.fulfilled
    ));
    
    it('deve disparar um erro se o produto for inválido', async () => (
      expect(productsService.validateProduct(INVALID_PRODUCT))
        .to.eventually.be.rejected
    ));
  });
  
  describe('Validação do salesService', () => {
    it('deve retornar o id se ele passar na validação', async () => (
      expect(salesService.validateId(VALID_ID))
        .to.eventually.be.fulfilled
    ));
    
    it('deve disparar um erro se o id for inválido', async () => (
      expect(salesService.validateId(INVALID_ID))
        .to.eventually.be.rejected
    ));
    
    it('deve retornar a venda se ele passar na validação', async () => (
      expect(salesService.validateProducts(SALES_PRODUCTS))
        .to.eventually.be.fulfilled
    ));
    
    it('deve disparar um erro se o produto for inválido', async () => (
      expect(salesService.validateProducts(INVALID_SALE_PRODUCTS))
        .to.eventually.be.rejected
    ));
  });
});
const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const db = require('../../../models/db');

const { SALES_LIST, SALE, SALES_PRODUCTS, INSERT_ID } = require('../data/salesData');
const { PRODUCTS_LIST } = require('../data/productsData');

describe('Teste unitário do salesModel', () => {
  afterEach(sinon.restore);
  
  describe('lista todas as vendas', () => {
    it('deve retornar uma lista com todas as vendas', async () => {
      sinon.stub(db, 'query').resolves([SALES_LIST]);
      const result = await salesModel.getAllSales();
      expect(result).to.be.deep.equal(SALES_LIST);
    });
  });
  
  describe('retorna a venda procurada pelo id', () => {
    it('deve retornar a venda se ela for encontrada', async () => {
      sinon.stub(db, 'query').resolves([SALE]);
      const result = await salesModel.getSaleById();
      expect(result).to.be.deep.equal(SALE);
    });
    
    it('deve retornar um array vazio se a venda não for encontrada', async () => {
      sinon.stub(db, 'query').resolves([[]]);
      const result = await salesModel.getSaleById();
      expect(result).to.be.empty;
    });
  });
  
  describe('lista os produtos que correspondem aos ids indicados', () => {
    it('deve retornar uma lista com os produtos encontrados', async () => {
      sinon.stub(db, 'query').resolves([PRODUCTS_LIST]);
      const result = await salesModel.getProductsByIds();
      expect(result).to.be.deep.equal(PRODUCTS_LIST);
    });
    
    it('deve retornar uma lista vazia se não encontrar nenhum produto', async () => {
      sinon.stub(db, 'query').resolves([[]]);
      const result = await salesModel.getProductsByIds();
      expect(result).to.be.deep.equal([]);
    });
  });
  
  describe('adiciona uma nova venda', () => {
    it('deve retornar o id da venda', async () => {
      sinon.stub(db, 'query')
        .onFirstCall()
        .resolves([{ insertId: INSERT_ID }])
        .onSecondCall()
        .resolves();

      const result = await salesModel.add(SALES_PRODUCTS);
      expect(result).to.be.deep.equal(INSERT_ID);
    });
  });
});

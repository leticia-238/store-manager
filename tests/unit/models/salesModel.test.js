const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const db = require('../../../models/db');

const { PRODUCTS_LIST } = require('../data');
  
describe('Teste unitário do salesModel', () => {
  afterEach(sinon.restore);
  
  describe('lista os produtos que correspondem aos ids indicados', () => {
    it('deve retornar uma lista com os produtos encontrados', async () => {
      sinon.stub(db, 'query').resolves([PRODUCTS_LIST]);
      const result = await salesModel.getByIds(PRODUCTS_LIST.map(({ id }) => id));
      expect(result).to.be.deep.equal(PRODUCTS_LIST);
    });
    
    it('deve retornar uma lista vazia se não encontrar nenhum produto', async () => {
      sinon.stub(db, 'query').resolves([[]]);
      const result = await salesModel.getByIds();
      expect(result).to.be.deep.equal([]);
    });
  });
  
  describe('adiciona um novo produto ou uma lista de produtos', () => {
    it('deve retornar o id da venda', async () => {
      const INSERT_ID = 3;
      
      sinon.stub(db, 'query')
        .onFirstCall()
        .resolves([{ insertId: INSERT_ID }])
        .onSecondCall()
        .resolves();

      const result = await salesModel.add(PRODUCTS_LIST);
      expect(result).to.be.deep.equal(INSERT_ID);
    });
  });
});

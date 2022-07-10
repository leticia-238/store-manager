const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

const { SALES_LIST, SALE, SAVED_SALE } = require('../data/salesData');
const NotFoundError = require('../../../errors/NotFoundError');

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Teste unitário do salesController', () => {
  const res = {};
  const req = { params: {}, body: {} };
  
  beforeEach(() => {
    sinon.resetHistory();
    res.status = sinon.stub().callsFake(() => res);
    res.json = sinon.stub().returns();
  });
  
  afterEach(sinon.restore);

  describe('lista todas as vendas', () => {
    it('deve retornar uma lista com todas as vendas', async () => {
      sinon.stub(salesService, 'getAll').resolves(SALES_LIST);
      await salesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(SALES_LIST)).to.be.equal(true);
    });
  });
  
  describe('retorna a venda procurada pelo id', () => {
    it('deve chamar o res.status com 200 e o res.json com a venda',
    async () => {
      sinon.stub(salesService, 'validateId').resolves();
      sinon.stub(salesService, 'getById').resolves(SALE); 
      await salesController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(SALE)).to.be.equal(true);
    });
    
    it('deve disparar um erro caso o salesService.getById dispare um erro',
    async () => {
      sinon.stub(salesService, 'validateId').resolves();
      sinon.stub(salesService, 'getById')
        .throws(() => new NotFoundError());
      return expect(salesController.getById(req, res))
        .to.eventually.be.rejectedWith(NotFoundError);
    });
    
    it('deve disparar um erro caso o salesService.validateId dispare um erro',
    async () => {
      sinon.stub(salesService, 'validateId').rejects();
      return expect(salesController.getById(req, res))
        .to.eventually.be.rejected;
    });
  });
  
  describe('adiciona uma nova venda', () => {
    it('deve retornar o produto ou os produtos que foram adicionados na venda',
    async () => {
      sinon.stub(salesService, 'validateProducts').resolves();
      sinon.stub(salesService, 'add').resolves(SAVED_SALE);
      await salesController.add(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(SAVED_SALE)).to.be.equal(true);
    });
    
    it('deve disparar um erro caso o salesService.validateProducts dispare um erro',
    async () => {
      sinon.stub(salesService, 'validateProducts').rejects();
      return expect(salesController.add(req, res))
        .to.eventually.be.rejected;
    });
  });
});
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

const { PRODUCTS_LIST, PRODUCT, SAVED_PRODUCT } = require('../data/productsData');
const NotFoundError = require('../../../errors/NotFoundError');

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Teste unitário do productsController', () => {
  const res = {};
  const req = { params: {}, body: {} };
  
  beforeEach(() => {
    sinon.resetHistory();
    res.status = sinon.stub().callsFake(() => res);
    res.json = sinon.stub().returns();
  });
  
  afterEach(sinon.restore);

  describe('lista todos os produtos', () => {
    it('deve retornar uma lista com todos os produtos', async () => {
      sinon.stub(productsService, 'getAll').resolves(PRODUCTS_LIST);
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(PRODUCTS_LIST)).to.be.equal(true);
    });
  });
  
  describe('retorna o produto procurado pelo id', () => {
    it('deve chamar o res.status com 200 e o res.json com o produto',
    async () => {
      sinon.stub(productsService, 'validateId').resolves();
      sinon.stub(productsService, 'getById').resolves(PRODUCT); 
      await productsController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(PRODUCT)).to.be.equal(true);
    });
    
    it('deve disparar um erro caso o productsService.getById dispare um erro',
    async () => {
      sinon.stub(productsService, 'validateId').resolves();
      sinon.stub(productsService, 'getById')
        .throws(() => new NotFoundError());
      return expect(productsController.getById(req, res))
        .to.eventually.be.rejectedWith(NotFoundError);
    });
    
    it('deve disparar um erro caso o productsService.validateId dispare um erro',
    async () => {
      sinon.stub(productsService, 'validateId').rejects();
      return expect(productsController.getById(req, res))
        .to.eventually.be.rejected;
    });
  });
  
  describe('adiciona um novo produto', () => {
    it('deve retornar o produto adicionado', async () => {
      sinon.stub(productsService, 'validateProduct').resolves();
      sinon.stub(productsService, 'add').resolves(SAVED_PRODUCT);
      await productsController.add(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(SAVED_PRODUCT)).to.be.equal(true);
    });
    
    it('deve disparar um erro caso o productsService.validateProduct dispare um erro',
    async () => {
      sinon.stub(productsService, 'validateProduct').rejects();
      return expect(productsController.add(req, res))
        .to.eventually.be.rejected;
    });
  });
});
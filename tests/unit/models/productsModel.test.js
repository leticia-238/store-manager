const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const db = require('../../../models/db');

const productsList = [
  { id: 1, name: 'Martelo de Thor'},
  { id: 2, name: 'Traje de encolhimento'}
];

const product = {
  id: 1,
  name: 'Martelo de Thor',
};
  
describe('', function () {
  afterEach(sinon.restore);
  
  it('retorna uma lista de produtos', async function () {
    sinon.stub(db, 'query').resolves([productsList]);
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(productsList);
  });
    
  it('retorna o produto se ele for encontrado', async function () {
    sinon.stub(db, 'query').resolves([[product]]);
    const result = await productsModel.getById(product.id);
    expect(result).to.be.deep.equal(product);
  });
    
  it('retorna um array vazio se o produto não for encontrado', async function () {
    sinon.stub(db, 'query').resolves([[]]);
    const result = await productsModel.getById(product.id);
    expect(result).to.be.undefined;
  });
});

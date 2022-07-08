const PRODUCTS_LIST = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
];

const PRODUCT = {
  id: 1,
  name: 'Martelo de Thor',
};

const NEW_PRODUCT = { name: 'ProdutoX' };
const INSERT_ID = 3;
const SAVED_PRODUCT = { ...NEW_PRODUCT, id: INSERT_ID };

const SALES_LIST = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const SALE = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

module.exports = {
  PRODUCTS_LIST,
  PRODUCT,
  NEW_PRODUCT,
  INSERT_ID,
  SAVED_PRODUCT,
  SALES_LIST,
  SALE,
};
// endpoint get /sales
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

// enpoint get /sales/:id
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

// enpoint post /sales
const SALES_PRODUCTS = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const INSERT_ID = 3;

const SAVED_SALE = {
  id: INSERT_ID,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

module.exports = {
  SALES_PRODUCTS,
  SALES_LIST,
  SALE,
  INSERT_ID,
  SAVED_SALE,
};
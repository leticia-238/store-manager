const PRODUCTS_LIST = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
];

const PRODUCT = {
  id: 1,
  name: 'Martelo de Thor',
};

const NEW_PRODUCT = { name: "ProdutoX" };
const INSERT_ID = 3;
const SAVED_PRODUCT = { ...NEW_PRODUCT, id: INSERT_ID };

module.exports = {
  PRODUCTS_LIST,
  PRODUCT,
  NEW_PRODUCT,
  INSERT_ID,
  SAVED_PRODUCT
};
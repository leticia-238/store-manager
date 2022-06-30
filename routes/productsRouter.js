const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();
require('express-async-errors');

productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.getById);

module.exports = productsRouter;
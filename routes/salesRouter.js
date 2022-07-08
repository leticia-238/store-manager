const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();
require('express-async-errors');

salesRouter.get('/', salesController.getAll);

salesRouter.get('/:id', salesController.getById);

salesRouter.post('/', salesController.add);

module.exports = salesRouter;
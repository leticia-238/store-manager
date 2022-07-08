const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();
require('express-async-errors');

salesRouter.post('/', salesController.add);

module.exports = salesRouter;
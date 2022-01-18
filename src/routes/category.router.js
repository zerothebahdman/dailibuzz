const { Router } = require('express');
const createCategory = require('../controller/category.controller');

const route = Router();
route.post('/', createCategory);

module.exports = route;

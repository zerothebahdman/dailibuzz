const { Router } = require('express');
const { getArticle } = require('../controller/article');
const cache = require('../utils/rediscache');

const router = Router();

router.get('/', cache, getArticle);

module.exports = router;

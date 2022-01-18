const { Router } = require('express');
const { getArticle, sortArticle } = require('../controller/article.controller');
const cache = require('../utils/rediscache');

const router = Router();

router.get('/', cache, getArticle);
router.get('/q', sortArticle);

module.exports = router;

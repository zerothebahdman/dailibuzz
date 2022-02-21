const { Router } = require('express');
const { getArticle, sortArticle } = require('../controller/article.controller');
const { isAuthenticated } = require('../middleware/Authentication.middleware');
const cache = require('../middleware/rediscache');

const router = Router();

router.get('/', isAuthenticated, cache, getArticle);
router.get('/q', sortArticle);

module.exports = router;

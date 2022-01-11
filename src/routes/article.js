const { Router } = require('express');
const { getArticle } = require('../controller/article');

const router = Router();

router.get('/', getArticle);

module.exports = router;

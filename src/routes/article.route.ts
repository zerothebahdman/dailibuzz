import { Router } from 'express';
import { getArticle, sortArticle } from '../controller/article.controller';
// import cache from '../utils/rediscache';

const router = Router();

router.get('/', getArticle);
router.get('/q', sortArticle);

export default router;
import { Router } from 'express';
import { createCategory } from '../controller/category.controller';

const route = Router();

route.post('/', createCategory);

export default route;

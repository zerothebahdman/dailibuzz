/**
 * Use this module file to create instances of all controllers and simplify imports in to your routers
 */

import UserController from './users.controller';
import CategoryController from './category.controller';
// import ArticleController from './article.controller';

const userController = new UserController();
const categoryController = new CategoryController();
export { userController, categoryController };

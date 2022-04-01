/**
 * Use this module file to create instances of all controllers and simplify imports in to your routers
 */

import UserController from './users.controller';
import CategoryController from './category.controller';
import ArticleController from './article.controller';
import UserService from '../../../../services/User.service';
import Categoryservice from '../services/Category.service';
import ArticleService from '../services/Article.service';
import UserAccessController from './integration/access-token.controller';
import TokenService from '../../../../services/Token.service';

const userController = new UserController(new UserService());
const categoryController = new CategoryController(new Categoryservice());
const articleController = new ArticleController(new ArticleService());
const userAccess = new UserAccessController(new TokenService());

export { userController, categoryController, articleController, userAccess };

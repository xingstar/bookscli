/**
 * 
 * 就是需要有一个路由注册机制，所以这个文件诞生了，在index.js管理所有的路由 
 * 
 */
import router from 'koa-simple-router';

import IndexController from './IndexController';
import BooksController from './BooksController';
const indexController = new IndexController();// 声明一个实例
const booksController = new BooksController();// 声明一个实例

export default (app) => {
    app.use(router(_ => {
      _.get('/',indexController.actionIndex);
      _.get('/index.html',indexController.actionIndex);
      _.get('/books/list',booksController.actionList);
      _.get('/books/view',booksController.actionView);
    }));
}
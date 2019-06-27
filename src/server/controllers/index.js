/**
 * 
 * 就是需要有一个路由注册机制，所以这个文件诞生了，在index.js管理所有的路由 
 * 
 */
const router = require('koa-simple-router');

const IndexController = require('./IndexController');
const BooksController = require('./BooksController');
const indexController = new IndexController();// 声明一个实例
const booksController = new BooksController();// 声明一个实例

module.exports = (app) => {
    app.use(router(_ => {
      _.get('/',indexController.actionIndex);
      _.get('/index.html',indexController.actionIndex);
      _.get('/books/list',booksController.actionList);
      _.get('/books/view',booksController.actionView);
    }));
}
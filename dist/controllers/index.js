"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaSimpleRouter = _interopRequireDefault(require("koa-simple-router"));

var _IndexController = _interopRequireDefault(require("./IndexController"));

var _BooksController = _interopRequireDefault(require("./BooksController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * 就是需要有一个路由注册机制，所以这个文件诞生了，在index.js管理所有的路由 
 * 
 */
const indexController = new _IndexController.default(); // 声明一个实例

const booksController = new _BooksController.default(); // 声明一个实例

var _default = app => {
  app.use((0, _koaSimpleRouter.default)(_ => {
    _.get('/', indexController.actionIndex);

    _.get('/index.html', indexController.actionIndex);

    _.get('/books/list', booksController.actionList);

    _.get('/books/view', booksController.actionView);
  }));
};

exports.default = _default;
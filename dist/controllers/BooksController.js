"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Books = _interopRequireDefault(require("../models/Books"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BooksController {
  constructor() {}

  async actionList(ctx, next) {
    const books = new _Books.default();
    console.log('actionList');
    const result = await books.getData({
      url: 'books/index'
    });
    console.log(result);
    ctx.body = await ctx.render('books/pages/list', {
      data: result.data
    }); // 不需要在books前加/
  } // r=books/view&id=1


  async actionView(ctx, next) {
    const books = new _Books.default();
    console.log('query参数', ctx.request.querystring);
    const result = await books.getData({
      url: 'books/view/&' + ctx.request.querystring
    });
    console.log("查看页面数据:", result);
    ctx.body = await ctx.render('books/pages/view', {
      data: result.data
    });
  }

}

var _default = BooksController;
exports.default = _default;
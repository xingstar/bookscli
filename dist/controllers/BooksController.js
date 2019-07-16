"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cheerio = _interopRequireDefault(require("cheerio"));

var _index = _interopRequireDefault(require("../config/index"));

var _awilixKoa = require("awilix-koa");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

// 使用路由
let BooksController = (_dec = (0, _awilixKoa.route)("/books"), _dec2 = (0, _awilixKoa.route)("/list"), _dec3 = (0, _awilixKoa.GET)(), _dec4 = (0, _awilixKoa.route)("/view/:id"), _dec5 = (0, _awilixKoa.GET)(), _dec6 = (0, _awilixKoa.route)("/add"), _dec7 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class BooksController {
  constructor({
    booksService
  }) {
    // 这里的参数 { booksService } 需要两边各有一个空格的
    console.log('🌈', booksService);
    this.booksService = booksService;
  }

  async actionList(ctx, next) {
    // const books = new Books();
    // const result = await books.getData({
    //     url: 'books/index'
    // });
    const result = await this.booksService.getData({
      url: 'books/index'
    });
    const html = await ctx.render('books/pages/list', {
      data: result.data
    }); // 不需要在books前加/
    // 把站内跳和直接刷的判断封装成了一个函数，写在了config的renderFn方法里。
    // if(ctx.request.header['x-pjax']){
    //     console.log('站内跳转');
    //     const $ = cheerio.load(html); // cheerio.load()就是把这段当成jQuery使用
    //     // ctx.body = $('.pjaxcontext').html();
    //     let _result = '';
    //     $('.pjaxcontext').each(function() { // 不能用箭头
    //         _result += $(this).html();
    //     });
    //     $(".lazyload-js").each(function() {
    //         console.log('🈶js的内容吗', $(this).attr('src'));
    //         _result += `<script src="${$(this).attr("src")}"></script>`;
    //     });
    //     ctx.body = _result;
    // }else {
    //     console.log("直接刷");
    //      ctx.body = html;
    // }

    _index.default.renderFn(ctx, html); // console.log('actionList');
    // console.log(result);

  }

  async actionView(ctx, next) {
    // const books = new Books();
    console.log('query参数', ctx.params.id); // const result = await books.getData({
    //     url: 'books/view/&'+ctx.request.querystring
    // });

    const result = await this.booksService.getData({
      url: 'books/view/&id=' + ctx.params.id
    });
    console.log("查看页面数据:", result); // ctx.body = await ctx.render('books/pages/view',{
    //     data:result.data
    // });

    const html = await ctx.render('books/pages/view', {
      data: result.data
    }); // 不需要在books前加/
    // if(ctx.request.header['x-pjax']){
    //     console.log('view站内跳转');
    //     const $ = cheerio.load(html);
    //     // ctx.body = $('.pjaxcontext').html();
    //     let _result = '';
    //     $('.pjaxcontext').each(function() { // 不能用箭头
    //         _result += $(this).html();
    //     });
    //     $(".lazyload-js").each(function() {
    //         _result += `<script src="${$(this).attr("src")}"></script>`;
    //     });
    //     ctx.body = _result;
    // }else {
    //     console.log("view直接刷");
    //      ctx.body = html;
    // }

    _index.default.renderFn(ctx, html);
  }
  /**
   * 渲染添加图书的页面
   * 路由是 /books/add
   * 接收的参数是 ctx对象，和next方法就是 插件 koa-simple-router支持的写法
   */


  async actionAdd(ctx, next) {
    // const books = new Books();
    // console.log('query参数',ctx.request.querystring);
    // const result = await books.getData({
    //     url: 'books/index'
    // });
    // console.log("查看页面数据:",result);
    // ctx.body = await ctx.render('books/pages/add');
    const html = await ctx.render('books/pages/add'); // 不需要在books前加/
    // if(ctx.request.header['x-pjax']){
    //     console.log('add站内跳转');
    //     const $ = cheerio.load(html);
    //     // ctx.body = $('.pjaxcontext').html();
    //     let _result = '';
    //     $('.pjaxcontext').each(function() { // 不能用箭头
    //         _result += $(this).html();
    //     });
    //     $(".lazyload-js").each(function() {
    //         _result += `<script src="${$(this).attr("src")}"></script>`;
    //     });
    //     ctx.body = _result;
    // }else {
    //     console.log("add直接刷1");
    //      ctx.body = html;
    // }

    _index.default.renderFn(ctx, html);
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "actionList", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "actionList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionView", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "actionView"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionAdd", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "actionAdd"), _class2.prototype)), _class2)) || _class);
var _default = BooksController;
exports.default = _default;
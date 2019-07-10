"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SafeRequest = _interopRequireDefault(require("../utils/SafeRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// models是重中之重

/**
 * a description
 * @Author   wulixing
 * @DateTime 2019-06-16T22:32:26+0800
 * @return   {class}               
 */
class Books {
  /**
   * Books类， 从后台获取的图书相关的数据
   * @class
   */

  /**
   * @constructor
   * @Author   wulixing
   * @DateTime 2019-06-16T22:44:36+0800
   * @param    {object}                 app [koa2执行的上下文]
   * @return   {function}                     [构造函数]
   */
  constructor(app) {
    this.app = app;
  }
  /**
   * [getData 获取后台全部图书列表数据的结果]
   * @Author   wulixing
   * @DateTime 2019-06-16T22:47:36+0800
   * @param { *} [options] [配置项 url:请求地址]
   * @return   {Promsie}                 [description]
   * @example
   * getData(options)
   */


  getData(options) {
    const safeRequest = new _SafeRequest.default(options.url);
    return safeRequest.fetch();
  }
  /**
   * [addBook 新增图书]
   * @Author   wulixing
   * @DateTime 2019-06-17T17:05:59+0800
   * @param {object} [options] [图书信息 options.bookName:图书名称， options.bookID:图书编号，options.author:图书作者，options.price:价格]
   */
  // addBook(options={
  //     bookName:'',
  //     bookID:'',
  //     author:'',
  //     price:0
  // }){
  //     const safeRequest = new SafeRequest('')
  // }
  //"http://localhost:8080/index.php?r=books/view&id=1"

  /**
   * [searchData 查看数据]
   * @Author   wulixing
   * @DateTime 2019-06-17T17:24:37+0800
   * @param    {object}                 options [查询条件 options.id是图书编号]
   * @return   {object}                         [一条图书数据]
   */
  // viewData(options){
  //     const safeRequest = new SafeRequest(options.url);
  //     return safeRequest.fetch();
  // }


}

var _default = Books;
exports.default = _default;
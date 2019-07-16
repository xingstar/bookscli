"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SafeRequest = _interopRequireDefault(require("../utils/SafeRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: ministar 
 * @Date: 2019-07-15 16:59:48 
 * @Last Modified by: ministar
 * @Last Modified time: 2019-07-16 14:24:31
 */

/**
 *
 *
 * @class BooksService
 */
class BooksService {
  constructor(app) {
    this.app = app;
  }
  /**
   *
   *
   * @param {*} options
   * @returns
   * @memberof BooksService
   */


  getData(options) {
    const url = "books/index";
    const safeRequest = new _SafeRequest.default(options.url);
    return safeRequest.fetch();
  }

}

var _default = BooksService;
exports.default = _default;
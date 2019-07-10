"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 所有的请求都必须经过此函数，即使服务器挂了，也要保证数据格式的正确定
class SafeRequest {
  constructor(url) {
    this.url = url;
    this.baseUrl = _config.default.baseUrl;
  }

  fetch() {
    let result = {
      code: 0,
      message: '',
      data: []
    };
    return new Promise((resolve, reject) => {
      console.log("🍒🍒🍒🍒", this.baseUrl + this.url);
      let actionFetch = (0, _nodeFetch.default)(this.baseUrl + this.url); // 注意需要进行一系列的try..catch

      actionFetch.then(res => res.json()).then(json => {
        result.data = json; // 数据设为后台返回的数据

        resolve(result);
      }).catch(error => {
        result.code = 1;
        result.message = '哎呀出错了';
      });
    });
  }

}

var _default = SafeRequest;
exports.default = _default;
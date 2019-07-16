"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _path = require("path");

var _cheerio = _interopRequireDefault(require("cheerio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config = {
  "viewDir": (0, _path.join)(__dirname, "..", "views"),
  // '..'就是表示上一层目录
  "staticDir": (0, _path.join)(__dirname, "..", "assets"),
  "renderFn": function (ctx, html) {
    // 把站内跳和直接刷的判断封装成了一个函数，写在了这里。
    if (ctx.request.header['x-pjax']) {
      console.log('view站内跳转');

      const $ = _cheerio.default.load(html); // ctx.body = $('.pjaxcontext').html();


      let _result = '';
      $('.pjaxcontext').each(function () {
        // 不能用箭头
        _result += $(this).html();
      });
      $(".lazyload-js").each(function () {
        console.log("🌲🌲🌲🌲js", $(this));
        _result += `<script src="${$(this).attr("src")}"></script>`;
      });
      $(".lazyload-css").each(function () {
        _result += `<link href="${$(this).attr("href")}">`;
      });
      ctx.body = _result;
    } else {
      console.log("view直接刷");
      ctx.body = html;
    }
  }
};

if (process.env.NODE_ENV == 'development') {
  // process.env.NODE_ENV设置环境变量的， 直接tree shaking的时候识别不了环境变量，需要使用rollup-plugin-replace
  const localConfig = {
    port: 8081,
    // baseUrl: '../mockData/'
    baseUrl: "http://localhost/yii_gii/basic/web/index.php?r=" //后台数据的地址
    // baseUrl:"http://localhost:8080/?r=",

  };
  config = (0, _lodash.extend)(config, localConfig); // 合并配置项
}

if (process.env.NODE_ENV == 'production') {
  const proConfig = {
    port: 80
  };
  config = (0, _lodash.extend)(config, proConfig);
}

var _default = config;
exports.default = _default;
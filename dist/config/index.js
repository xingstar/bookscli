"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _path = require("path");

let config = {
  "viewDir": (0, _path.join)(__dirname, "..", "views"),
  // '..'就是表示上一层目录
  "staticDir": (0, _path.join)(__dirname, "..", "assets")
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
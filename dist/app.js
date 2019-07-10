"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

var _co = require("co");

var _index = _interopRequireDefault(require("./config/index.js"));

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler"));

var _log4js = require("log4js");

var _controllers = _interopRequireDefault(require("./controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 使用静态文件的插件
const app = new _koa.default();
(0, _log4js.configure)({
  appenders: {
    cheese: {
      type: 'file',
      filename: __dirname + '/logs/yd.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    } // lever

  }
});
app.use((0, _koaStatic.default)(_index.default.staticDir));
app.context.render = (0, _co.wrap)((0, _koaSwig.default)({
  root: _index.default.viewDir,
  // 
  autoescape: true,
  varControls: ["[[", "]]"],
  // 服务器端的渲染写法跟vue的模板引擎用法冲突了, 是个数组
  cache: false,
  // disable, set to false 尽量不要开启缓存，经常有改动了会不变
  ext: 'html',
  writeBody: false
}));
const logger = (0, _log4js.getLogger)('cheese'); // logger对象  注意这里传的参数是 cheese 上面log4js配置中的appenders中的cheese这个对象
// 先让他执行next 先往下走，然后回来的时候再判断

_errorHandler.default.error(app, logger); // errorHandler放置的位置非常重要，koa2的use的执行顺序就是穿洋葱式的。errorHanlder需要在等待他们回来的时候再执行
// app.use(serve("./assets"));


(0, _controllers.default)(app); // require(文件夹) 就会默认的去找文件夹下的index.js文件  这一步就是使用路由的步骤

app.listen(_index.default.port, () => {
  console.log("books启动成功");
});
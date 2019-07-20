"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

var _co = require("co");

var _index = _interopRequireDefault(require("./config/index.js"));

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler"));

var _log4js = require("log4js");

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 使用静态文件的插件
const app = new _koa.default();
// 必须把Service融入到容器里
const container = (0, _awilix.createContainer)(); // 因为不经过显示的引入文件使用之前的models这块了（改为 services这块了），所以要声明一个容器，进行依赖注入

container.loadModules([__dirname + '/services/*.js'], {
  // 拼接地址的时候一定要在前面写 / 比如这里的 '/services/*.js'
  formatName: 'camelCase',
  // 因为我们在 services这个文件夹里建的js开头都是大写的，我们想要驼峰式的，所以这里配置成驼峰式的
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED // 配置声明周期是 SCOPED

  }
}); // 终极注入

app.use((0, _awilixKoa.scopePerRequest)(container));
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

app.context.logger = logger;

_errorHandler.default.error(app); // errorHandler放置的位置非常重要，koa2的use的执行顺序就是穿洋葱式的。errorHanlder需要在等待他们回来的时候再执行
// app.use(serve("./assets"));
// controllerInit(app); // require(文件夹) 就会默认的去找文件夹下的index.js文件  这一步就是使用路由的步骤


app.use((0, _awilixKoa.loadControllers)(__dirname + "/controllers/*.js")); // 直接去找controllers文件夹里的文件就可以了，不需要index.js的入口文件

app.listen(_index.default.port, () => {
  console.log("books启动成功");
}); // 进行错误监控的

process.on("uncaughtException", function (err) {
  // g.notifyError(a, { type: "uncaughtError" }, 
  // function () { process.exit(1) }) 
  logger.error(err);
});
process.on("unhandledRejection", function (info) {
  // g.notifyError(a, { type: "uncaughtError" }) 
  logger.error(info.reason);
});
app.on("error", function (err) {
  logger.error(info.reason);
});
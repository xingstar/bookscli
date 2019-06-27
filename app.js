const Koa = require('koa');
const serve = require('koa-static'); // 使用静态文件的插件
const render = require('koa-swig');
const co = require('co');
const config = require('./src/server/config');
const app = new Koa();
const errorHandler = require('./src/server/middlewares/errorHandler');
const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: './src/server/logs/yd.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } } // lever
});

app.context.render = co.wrap(render({
  root: config.viewDir, // 
  autoescape: true,
  varControls:["[[","]]"],  // 服务器端的渲染写法跟vue的模板引擎用法冲突了, 是个数组
  cache: false, // disable, set to false 尽量不要开启缓存，经常有改动了会不变
  ext: 'html',
  writeBody: false
}));

const logger = log4js.getLogger('cheese'); // logger对象  注意这里传的参数是 cheese 上面log4js配置中的appenders中的cheese这个对象
// 先让他执行next 先往下走，然后回来的时候再判断
errorHandler.error(app,logger); // errorHandler放置的位置非常重要，koa2的use的执行顺序就是穿洋葱式的。errorHanlder需要在等待他们回来的时候再执行

// app.use(serve("./assets"));

require('./src/server/controllers')(app); // require(文件夹) 就会默认的去找文件夹下的index.js文件  这一步就是使用路由的步骤

app.listen(8081, () => {
    console.log("books启动成功");
})
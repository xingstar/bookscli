import Koa from 'koa';
import serve from 'koa-static'; // 使用静态文件的插件
import render from 'koa-swig';
import { wrap } from 'co';
import config from './config/index.js';
const app = new Koa();
import errHandler from './middlewares/errorHandler';
import { configure, getLogger } from 'log4js';
import controllerInit from './controllers';
configure({
  appenders: { cheese: { type: 'file', filename: __dirname + '/logs/yd.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } } // lever
});
app.use(serve(config.staticDir));
app.context.render = wrap(render({
  root: config.viewDir, // 
  autoescape: true,
  varControls:["[[","]]"],  // 服务器端的渲染写法跟vue的模板引擎用法冲突了, 是个数组
  cache: false, // disable, set to false 尽量不要开启缓存，经常有改动了会不变
  ext: 'html',
  writeBody: false
}));

const logger = getLogger('cheese'); // logger对象  注意这里传的参数是 cheese 上面log4js配置中的appenders中的cheese这个对象
// 先让他执行next 先往下走，然后回来的时候再判断
errHandler.error(app,logger); // errorHandler放置的位置非常重要，koa2的use的执行顺序就是穿洋葱式的。errorHanlder需要在等待他们回来的时候再执行

// app.use(serve("./assets"));

controllerInit(app); // require(文件夹) 就会默认的去找文件夹下的index.js文件  这一步就是使用路由的步骤

app.listen(config.port, () => {
    console.log("books启动成功");
})
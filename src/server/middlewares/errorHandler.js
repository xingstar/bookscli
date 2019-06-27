// 错误处理  koa2的执行顺序是 穿越洋葱模式
// 暴露出去错误，需要log4js  ,但是log4js没有用好的话特别容易造成nodejs内存泄漏 。 日志队列消费不及时，别人都不攻击你了，你还在不停的记录日志
// 跑在cmd上的的node命令 只能检测到静态的错误，不能检测到运行时的错误，所以cmd上不会出现错误提示
const errHandler = {

    error(app, logger){
        app.use(async(ctx, next) => {
            try{
                await next();
            } catch(error){
                //如果node挂了，要及时差错
                // 判断是否是开发还是线上模式  开发模式就出错误信息，如果是线上模式，则统一展示一个错误图片提示
                logger.error(error); // 同时可以打电话发短信  注意 error必须整个都穿过去，不能马虎
                // ctx.status = error.status || 200; // 主要是怕降权 所以返回200 ，但是自己要知道已经报500错误了
                ctx.status = error.status || 500; // 正常得是500
                ctx.body = "错误";
            }
            
        });
        app.use(async(ctx, next) => {
            await next(); // 先next()
            if(404 !== ctx.status) {
                return ;
            }
            ctx.status = 404; // 很多网站出现了404 但是请求中返回的status是200， 主要是因为 出现404 就会出现服务不稳定，进行SEO时 降权会非常严重
            ctx.body='<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
        })
    }
}

module.exports = errHandler;
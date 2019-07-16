// import Books from "../models/Books";
import cheerio from 'cheerio';
import config from '../config/index';
import { route, GET } from 'awilix-koa'; // 使用路由
import { Readable } from 'stream'; // 分段返回html
@route("/books")
class BooksController{
    constructor({ booksService }) { // 这里的参数 { booksService } 需要两边各有一个空格的
        console.log('🌈', booksService);
        this.booksService = booksService;
    }
    @route("/list")
    @GET()
    async actionList(ctx, next){
        // const books = new Books();
        // const result = await books.getData({
        //     url: 'books/index'
        // });
        const result = await this.booksService.getData({
                url: 'books/index'
            });
        const html = await ctx.render('books/pages/list',{
            data:result.data
        }); // 不需要在books前加/
        // 把站内跳和直接刷的判断封装成了一个函数，写在了config的renderFn方法里。
        if(ctx.request.header['x-pjax']){
            renderFn(ctx,html);
        }else {
            console.log("直接刷");
            await createSSRStreamPromise(ctx,html);
            //  ctx.body = html;
        }
       
    }

    @route("/view/:id")
    @GET()
    // r=books/view&id=1
    async actionView(ctx, next){
        // const books = new Books();
        // const result = await books.getData({
        //     url: 'books/view/&'+ctx.request.querystring
        // });
        console.log('query参数',ctx.params.id);
        const result = await this.booksService.getData({
            url: 'books/view/&id='+ctx.params.id
        });
        console.log("查看页面数据:",result);
        // ctx.body = await ctx.render('books/pages/view',{
        //     data:result.data
        // });
        const html = await ctx.render('books/pages/view',{
            data:result.data
        }); // 不需要在books前加/
        if(ctx.request.header['x-pjax']){
            renderFn(ctx,html);
        
        }else {
            await createSSRStreamPromise(ctx, html);
        //      ctx.body = html;
        }
       
    }

    /**
     * 渲染添加图书的页面
     * 路由是 /books/add
     * 接收的参数是 ctx对象，和next方法就是 插件 koa-simple-router支持的写法
     */
    @route("/add")
    @GET()
    async actionAdd(ctx, next){
        // const books = new Books();
        // const result = await books.getData({
        //     url: 'books/index'
        // });

        // ctx.body = await ctx.render('books/pages/add');
        const html = await ctx.render('books/pages/add'); // 不需要在books前加/
        if(ctx.request.header['x-pjax']){
            renderFn(ctx,html);
        }else {
            await createSSRStreamPromise(ctx, html);
        //      ctx.body = html;
        }
        
    }

}

function renderFn(ctx,html){  // 把站内跳和直接刷的判断封装成了一个函数，写在了这里。
    console.log('view站内跳转');
    const $ = cheerio.load(html);
    // ctx.body = $('.pjaxcontext').html();
    let _result = '';
    $('.pjaxcontext').each(function() { // 不能用箭头
        _result += $(this).html();
    });
    $(".lazyload-js").each(function() {
        console.log("🌲🌲🌲🌲js",$(this));
        _result += `<script src="${$(this).attr("src")}"></script>`;
    });
    $(".lazyload-css").each(function() {
        _result += `<link href="${$(this).attr("href")}">`;
    });
    ctx.body = _result;
}
// 直出时 分段渲染
function createSSRStreamPromise(ctx, html){
    return new Promise((resolve,reject) => {
        const htmlStream = new Readable();
        htmlStream.push(html);
        htmlStream.push(null);
        ctx.status= 200;
        ctx.type="html";
        htmlStream.on("error", (err) => {
            reject(err);
        }).pipe(ctx.res);
    })
}
export default BooksController;
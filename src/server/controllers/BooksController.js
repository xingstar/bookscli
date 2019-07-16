// import Books from "../models/Books";
import cheerio from 'cheerio';
import config from '../config/index';
import { route, GET } from 'awilix-koa'; // 使用路由
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
       
        // if(ctx.request.header['x-pjax']){
        //     console.log('站内跳转');
        //     const $ = cheerio.load(html); // cheerio.load()就是把这段当成jQuery使用
        //     // ctx.body = $('.pjaxcontext').html();
        //     let _result = '';
        //     $('.pjaxcontext').each(function() { // 不能用箭头
        //         _result += $(this).html();
        //     });
        //     $(".lazyload-js").each(function() {
        //         console.log('🈶js的内容吗', $(this).attr('src'));
        //         _result += `<script src="${$(this).attr("src")}"></script>`;
        //     });
        //     ctx.body = _result;
        // }else {
        //     console.log("直接刷");
        //      ctx.body = html;
        // }
        config.renderFn(ctx,html);
        // console.log('actionList');
        
        // console.log(result);
       
    }

    @route("/view/:id")
    @GET()
    // r=books/view&id=1
    async actionView(ctx, next){
        // const books = new Books();
        console.log('query参数',ctx.params.id);
        // const result = await books.getData({
        //     url: 'books/view/&'+ctx.request.querystring
        // });
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
        // if(ctx.request.header['x-pjax']){
        //     console.log('view站内跳转');
        //     const $ = cheerio.load(html);
        //     // ctx.body = $('.pjaxcontext').html();
        //     let _result = '';
        //     $('.pjaxcontext').each(function() { // 不能用箭头
        //         _result += $(this).html();
        //     });
        //     $(".lazyload-js").each(function() {
        //         _result += `<script src="${$(this).attr("src")}"></script>`;
        //     });
        //     ctx.body = _result;
        // }else {
        //     console.log("view直接刷");
        //      ctx.body = html;
        // }
        config.renderFn(ctx,html);
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
        // console.log('query参数',ctx.request.querystring);
        // const result = await books.getData({
        //     url: 'books/index'
        // });

        // console.log("查看页面数据:",result);
        // ctx.body = await ctx.render('books/pages/add');
        const html = await ctx.render('books/pages/add'); // 不需要在books前加/
        // if(ctx.request.header['x-pjax']){
        //     console.log('add站内跳转');
        //     const $ = cheerio.load(html);
        //     // ctx.body = $('.pjaxcontext').html();
        //     let _result = '';
        //     $('.pjaxcontext').each(function() { // 不能用箭头
        //         _result += $(this).html();
        //     });
        //     $(".lazyload-js").each(function() {
        //         _result += `<script src="${$(this).attr("src")}"></script>`;
        //     });
        //     ctx.body = _result;
        // }else {
        //     console.log("add直接刷1");
        //      ctx.body = html;
        // }
        config.renderFn(ctx,html);
    }

}


export default BooksController;
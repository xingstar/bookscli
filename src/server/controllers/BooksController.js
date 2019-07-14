import Books from "../models/Books";
import cheerio from 'cheerio';
class BooksController{
    constructor() {

    }

    async actionList(ctx, next){
        const books = new Books();
        const result = await books.getData({
            url: 'books/index'
        });
        const html = await ctx.render('books/pages/list',{
            data:result.data
        }); // 不需要在books前加/
        if(ctx.request.header['x-pjax']){
            console.log('站内跳转');
            const $ = cheerio.load(html);
            // ctx.body = $('.pjaxcontext').html();
            let _result = '';
            $('.pjaxcontext').each(function() { // 不能用箭头
                _result += $(this).html();
            });
            ctx.body = _result;
        }else {
            console.log("直接刷");
             ctx.body = html;
        }
        

        // console.log('actionList');
        
        // console.log(result);
       
    }

    // r=books/view&id=1
    async actionView(ctx, next){
        const books = new Books();
        console.log('query参数',ctx.request.querystring);
        const result = await books.getData({
            url: 'books/view/&'+ctx.request.querystring
        });

        console.log("查看页面数据:",result);
        // ctx.body = await ctx.render('books/pages/view',{
        //     data:result.data
        // });
        const html = await ctx.render('books/pages/view',{
            data:result.data
        }); // 不需要在books前加/
        if(ctx.request.header['x-pjax']){
            console.log('view站内跳转');
            const $ = cheerio.load(html);
            // ctx.body = $('.pjaxcontext').html();
            let _result = '';
            $('.pjaxcontext').each(function() { // 不能用箭头
                _result += $(this).html();
            });
            ctx.body = _result;
        }else {
            console.log("view直接刷");
             ctx.body = html;
        }
    }

    async actionAdd(ctx, next){
        // const books = new Books();
        // console.log('query参数',ctx.request.querystring);
        // const result = await books.getData({
        //     url: 'books/index'
        // });

        // console.log("查看页面数据:",result);
        // ctx.body = await ctx.render('books/pages/add');
        const html = await ctx.render('books/pages/add'); // 不需要在books前加/
        if(ctx.request.header['x-pjax']){
            console.log('add站内跳转');
            const $ = cheerio.load(html);
            // ctx.body = $('.pjaxcontext').html();
            let _result = '';
            $('.pjaxcontext').each(function() { // 不能用箭头
                _result += $(this).html();
            });
            ctx.body = _result;
        }else {
            console.log("add直接刷");
             ctx.body = html;
        }
    }
}

export default BooksController;
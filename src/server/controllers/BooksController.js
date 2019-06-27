const Books = require("../models/Books");
class BooksController{
    constructor() {

    }

    async actionList(ctx, next){
        const books = new Books();

        console.log('actionList');
        const result = await books.getData({
            url: 'books/index'
        });

        console.log(result);
        ctx.body = await ctx.render('books/list',{
            data:result.data
        }); // 不需要在books前加/
    }

    // r=books/view&id=1
    async actionView(ctx, next){
        const books = new Books();
        console.log('query参数',ctx.request.querystring);
        const result = await books.getData({
            url: 'books/view/&'+ctx.request.querystring
        });

        console.log("查看页面数据:",result);
        ctx.body = await ctx.render('books/view',{
            data:result.data
        });
    }
}

module.exports = BooksController;
class IndexController{
    constructor() {

    }

    async actionIndex(ctx, next){
        // ctx.body = "hehehe";
        // console.log(ctxy);
        ctx.body = await ctx.render('books/index',{
            data:'hello sd'
        }); // 不需要在books前加/
    }
}

module.exports = IndexController;
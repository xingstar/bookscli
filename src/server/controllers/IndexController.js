import { route, GET } from "awilix-koa";
@route("/")
class IndexController{
    constructor() {

    }
    @route("/")
    @GET()
    async actionIndex(ctx, next){
        // ctx.body = "hehehe";
        // console.log(ctxy);
        ctx.body = {
            data:'hello sd'
        }; // 不需要在books前加/
    }
}

export default IndexController;
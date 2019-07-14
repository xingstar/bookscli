import { extend } from "lodash";

import { join } from 'path';

let config = {
    "viewDir": join(__dirname, "..","views"), // '..'就是表示上一层目录
    "staticDir": join(__dirname, "..","assets"),

}

if(process.env.NODE_ENV == 'development'){ // process.env.NODE_ENV设置环境变量的， 直接tree shaking的时候识别不了环境变量，需要使用rollup-plugin-replace
    const localConfig = {
        port: 8081,
        // baseUrl: '../mockData/'
        baseUrl: "http://localhost/yii_gii/basic/web/index.php?r=", //后台数据的地址
        // baseUrl:"http://localhost:8080/?r=",
    }

    config = extend(config,localConfig); // 合并配置项
}

if(process.env.NODE_ENV == 'production'){
    const proConfig = {
        port: 80
    }

    config = extend(config,proConfig);
}

export default config
// 所有的请求都必须经过此函数，即使服务器挂了，也要保证数据格式的正确定
import config from '../config';
import fetch from 'node-fetch';
class SafeRequest{
    constructor(url){
        this.url = url;
        this.baseUrl = config.baseUrl;
    }

    fetch(){
        let result = {
            code: 0,
            message:'',
            data:[]
        }

        return new Promise((resolve, reject) => {
            console.log("🍒🍒🍒🍒",this.baseUrl + this.url);
            let actionFetch = fetch(this.baseUrl + this.url);

            // 注意需要进行一系列的try..catch
            actionFetch.then(res => res.json())
                .then((json) => {
                    result.data = json; // 数据设为后台返回的数据
                    resolve(result);
                }).catch((error) => {
                    result.code = 1;
                    result.message = '哎呀出错了';
                })
        })
    }
}

export default SafeRequest;
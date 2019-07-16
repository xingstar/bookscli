// 目的是 对生成的文件 打标记  往html里注入2种js文件
// compilation.hooks.htmlWebpackPluginAlterAssetTags
const pluginName = "htmlAfterPlugin";
const safariFix = `(function(){
        var check = document.createElement('script'); 
        // 刚创建的 check标签是空的,所以不会有 noModule属性， 并且在他加载之前执行
        if(!('noModule' in check) && 'onbeforeload' in check){
            // 如果不支持noModule 并且在加载之前
            var support = false;
            document.addEventListener('beforeload', function(e){
                if(e.target === check) {
                    support = true;
                } else if(!e.target.hasAttribute('nomodule') || !support){
                    return;
                }

                e.preventDefault();
            },true);

            // 下面这几行代码是先于 上面这个监听事件执行的
            check.type = 'module';
            check.src = '.';
            document.head.appendChild(check);
            check.remove();
        }
    }());`;
const assetsHelp = (data) => {
    let js = [];
    let css = [];
    const dir = {
        js: item => `<script type="module" class="lazyload-js" src="${item}"></script>`,
        // js: item => `basket.require({url: '${item}'}).then(function(){
        //         console.log('entersdfas?');
        //     });`,
        css: item => `<link rel="stylesheet" class="lazyload-css" href="${item}">`
    }
    for(let jsitem of data.js){
        js.push(dir.js(jsitem));
    }
    for(let cssitem of data.css){
        css.push(dir.css(cssitem));
    }
    return {
        js,
        css
    }
}
class htmlAfterPlugin{
    constructor(moduleType){
        this.moduleType = moduleType; 
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            // 想触发就用 tap 相当于trigger htmlWebpackPluginAlterAssetTags这个就是要处理什么钩子  tagAsync就是异步处理的
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(pluginName,(htmlPluginData,cb)=>{
                // if(this.moduleType == 'nomodule'){// 就判断moduleType是nomodule时插入一遍就好了
                //    htmlPluginData.body.push({
                //         tagName:'script',
                //         closeTag: true,
                //         innerHTML: safariFix
                //     }) 
                // }
                htmlPluginData.body.forEach(tag => {

                    console.log(tag);
                    // 遍历资源，把script中的es6的js和es5的js分别加上不同的属性值
                    if(tag.tagName == 'script' && tag.attributes){
                        if(/\.bundle\./.test(tag.attributes.src)) {
                            console.log('😯in公共44');
                            delete tag.attributes.type;
                            tag.attributes.nomodule = ""
                        } else {
                            tag.attributes.type = 'module';
                        }
                    }
                    

                    
                })
                cb(null, htmlPluginData)
            });
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, (htmlPluginData) => {
                // console.log('🍎==========',htmlPluginData);// htmlPluginData就是html的所有信息，包括属性html代表着源码
                htmlPluginData.html = htmlPluginData.html.replace(/\s+nomodule=""/g, " nomodule"); // 这个就是把属性 nomodule="" 替换成属性 nomodule

                console.log('🍌',htmlPluginData.assets);
                // 这个就是为了把 @components替换成 ../../../
                // 第二 为了把 <!-- injectjs、injectcss --> 替换
                console.log('香蕉')
                let _html = htmlPluginData.html; // htmlPluginData.html是字符串
                _html = _html.replace(/@components\//g,'../../../components/');
                const result = assetsHelp(htmlPluginData.assets);
                _html = _html.replace("<!-- injectjs -->",result.js.join(''));
                // _html = _html.replace("<!-- injectjs -->",`<script class="lazyload-js">${result.js.join(';')}</script>`);
                _html = _html.replace("<!-- injectcss -->",result.css.join(''));
                htmlPluginData.html = _html;
            })
        })
    }
}
// const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

// class ConsoleLogOnBuildWebpackPlugin {
//     apply(compiler) {
//         compiler.hooks.run.tap(pluginName, compilation => {
//             console.log("webpack 构建过程开始！");
//         });
//     }
// }
module.exports = htmlAfterPlugin;
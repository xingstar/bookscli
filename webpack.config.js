let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlAfterPlugin = require('./config/htmlAfterPlugin');
const argv = require('yargs-parser')(process.argv.slice(2)); // 拿到用户输入的值
const __mode = argv.mode || 'development';
const __module = argv.modules || 'nomodule';
const __mergeConfig = require(`./config/webpack.${__mode}.js`); // 把各种环境的配置文件分别写成文件
const __mergeModuleConfig = require(`./config/webpack.${__module}.js`); // 把各种环境的配置文件分别写成文件
const merge = require('webpack-merge');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// 生成manifest插件
const ManifestPlugin = require('webpack-manifest-plugin');

// 遍历所有的第三方js
// const jsFiles = glob.sync('./src/public/javascript/*.js');
// let _entryVendor = {};
// for(let jsItem of jsFiles){
    
//     let filename = jsItem.split('/').pop().split('.')[0];
//     console.log('🍇',jsItem, '🍇', filename);
//     _entryVendor[filename] = jsItem;
// }


let _entry = {};
let _plugins = [];
const files = glob.sync("./src/web/views/**/*.entry.js");
for(let item of files){
    console.log('🍎', item);
    // 要得到的数据就是
    // {
    //     index: "./src/web/views/books/books-index.entry.js",
    //     list: "./src/web/views/books/books-list.entry.js"
    // }
    if(/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item)){
        console.log('🍊',RegExp.$1)
        const entryKey = RegExp.$1;
        const [dist, template] = entryKey.split('-');
        _entry[entryKey] = item;
        _plugins.push(new HtmlWebpackPlugin({
            template:`src/web/views/${dist}/pages/${template}.html`,
            filename:`../views/${dist}/pages/${template}.html`,
            inject: false, // 不让他插入
            chunks: [entryKey]
        }))
    }
}
// console.log('====🌹', merge(_entry, _entryVendor));
console.log('用户参数', __mode, __module);

const webpackConfig = {
    // 生成多个js
    entry:_entry,
    output:{
        path: path.join(__dirname,'./dist/assets'),
        publicPath: '/', //  跟node结合需要声明一个publicPath 这个地方有待研究 具体什么意思
        filename: 'scripts/[name].bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.css/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            hmr: __mode === 'development',
                        },
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[

        // new HtmlWebpackPlugin({
        //     // 需要制定一个执行顺序，比如先 生成es5的js,就是__module为nomodule值时，如下写法。 这样执行es6的js时就需要替换dist里的HTML
        //     template:__module == 'nomodule'?`src/index.html` : 'dist/index.html',   // 这里为了解决就只用一种script，没有module 和nomodule共存的问题

        //     filename:`index.html` // 默认的是生成在dist文件夹下，名字就叫index.html
        // }),
        ..._plugins,
        new MiniCssExtractPlugin({
            // 类似于 webpack的output 相同选项的选项
            // 以下参数都是可选的
            filename: __mode != 'production' ? 'style/[name].css': 'style/[name].[hash].css',
            chunkFilename: __mode !== 'production' ? 'style/[id].css' : 'style/[id].[hash].css',
        }),
        new CopyPlugin([
            { from: path.join(__dirname,'',"src/public/javascript"),
               to: '../assets/scripts',
               ignore: ['.DS_Store'], // copy文件时 需要注意的点就是 一些系统的文件不要复制过去
            },
          ]),
        new ManifestPlugin(),
        new htmlAfterPlugin(__module), // 传入一个module参数，是nomodule还是module
    ]
};

module.exports = merge(webpackConfig,__mergeModuleConfig,__mergeConfig);
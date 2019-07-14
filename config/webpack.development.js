const { join } = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var notifier = require('node-notifier');
var ICON = join(__dirname, '../dog.png');
// console.log(ICON);
const setTitle = require('node-bash-title');
const CopyPlugin = require('copy-webpack-plugin');
const webpack  = require('webpack');
setTitle('🍻  开发环境');

console.log(webpack);
module.exports = {
    devServer:{
        contentBase: join(__dirname,'../dist'),
        hot:true,
        quiet: true, // 这个为了配合 FriendlyErrorsWebpackPlugin
    },
    
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin([
          { from: join(__dirname,"../","src/web/views/layouts/layout.html"), to: '../views/layouts/layout.html' },
          { from: join(__dirname,"../","src/web/components"),
             to: '../components',
             ignore: ['*.js','*.css','.DS_Store'], // copy文件时 需要注意的点就是 一些系统的文件不要复制过去
          },
        ]),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [''],
                notes: ['在开发阶段使用 npm run client:server']
            },
            
            onErrors: function (severity, errors) {
              // You can listen to errors transformed and prioritized by the plugin
              // severity can be 'error' or 'warning'
              // if (severity !== 'error') {
              //   return;
              // }
              // const error = errors[0];
              // notifier.notify({
              //   title: "Webpack error",
              //   message: severity + ': ' + error.name,
              //   subtitle: error.file || '',
              //   icon: ICON
              // });
              

              new WebpackBuildNotifierPlugin({
                title: "My Project Webpack Build",
                logo: join(__dirname, '../dog.png'),
                suppressSuccess: true
              })
            },
            // should the console be cleared between each compilation?
            // default is true
            clearConsole: true,
           
            // add formatters and transformers (see below)
            additionalFormatters: [],
            additionalTransformers: []

        }),
        new WebpackBuildNotifierPlugin({
          title: "My Project Webpack Build",
          logo: join(__dirname, '../dog.png'),
          suppressSuccess: true
        })
    ]
}
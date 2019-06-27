let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ConsoleLogOnBuildWebpackPlugin = require('./config/htmlAfterPlugin');
const agrv = require('yargs-parser')(process.argv.slice(2));
const __mode = argv.mode || 'development';
const __mergeConfig = require(`./config/webpack.$(__mode).js`);
const __module = argv.modules || 'nomodule';
const merge = require('webpack-merge');


console.log('用户参数', __mode);

const webpackConfig = {


    plugins:[
        new HtmlWebpackPlugin({
            template:`src/index.html`,
            filename:`index.html`
        })，
        new ConsoleLogOnBuildWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
    ]
};

module.exports = webpackConfig;
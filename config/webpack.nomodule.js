const path = require('path');
module.exports ={
    output:{
        // path: path.join(__dirname,'./dist/asstes'),
        filename: "scripts/[name].es5.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            // loader: 'babel-loader?cacheDirectory: true',// 为了编译性能
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
}
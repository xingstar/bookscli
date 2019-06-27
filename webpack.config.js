let path = require('path');

module.exports = {
    entry: {
        main: path.join(__dirname, './src/web/assets/index'),
        yd: path.join(__dirname, './src/web/assets/yd')
    },
    output:{
        path: path.join(__dirname,'dist')
    }
}
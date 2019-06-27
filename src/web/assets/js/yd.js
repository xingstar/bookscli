// 帮助类库、公用的类库
// 函数式编程 对于封装的公用库特别有用 
// 模仿函数式编程的库Underscorejs
// 1、肯定是一个闭包
// 2、判断是什么环境
// 3、函数式编程 需要一个函数呀
(function(){
    // 浏览器环境还是node环境
    var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this ||
            {};
    var ArrayProto = Array.prototype, push = ArrayProto.push;


    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj); // 隐式new  想到哪与函数式编程的 of
        this._wrapped = obj;
    };

    _.map = function(wrapped, callback){
        console.log('map');
        console.log(wrapped);
        console.log(callback);
    };


    // 框架之外的 主要业务逻辑
    // 函数节流
    _.throttle = function(fn, wait =500){
        let timer = null;
        return function(...args){
           if(timer == null){
                timer = setTimeout(()=>{
                    timer = null;
                },wait);
                return fn.apply(this,args);
            } 
        }
        
    };
    
    // 要是每个方法都这么手写的挂载，那要累死， 所以需要一个 混入函数，进行自动挂载
    // _.prototype.map = function(){
    //     _.map.call(this); // 注意哈， 这里一定不能直接赋值 _map();  是需要进行this绑定的，一定要纠正this的指向
    // }


    /**
     * [each description]
     * @Author   wulixing
     * @DateTime 2019-06-16T15:58:07+0800
     * @param    {[type]}                 obj      [是个数组，是由挂载到_上的方法组成的数组]
     * @param    {[type]}                 iteratee [迭代器的意思]
     * @return   {[type]}                          [description]
     */
    _.each = function(obj, iteratee) { // iteratee 是迭代器的意思
        if(Array.isArray(obj)){
            // 如果是数组
            for(let item of obj){
                iteratee && iteratee.call(_, item);
            }
        }
    };
    // Return a sorted list of the function names available on the object.
    // Aliased as `methods`.
    _.functions = function(obj) {
        var names = [];
        for (var key in obj) {
          if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };

    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    }


    // 进行混入， 原型链挂载到自己身上
    _.mixin = function(obj) {
        _.each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return func.apply(_, args);
            };
        });
        return _;
    };

    // // Add all of the Underscore functions to the wrapper object.
    _.mixin(_); // 把自己混自己  把原型链的方法指到这个_对象上， 可以实现2种方式的调用  _().map  和 _.map() 
    
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
          exports = module.exports = _;
        }
        exports._ = _;
    } else {
      root._ = _;
    }
}());

// _().map;
// _.map();
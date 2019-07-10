// 这个js的命名规则是books文件夹，下page中的特定的html ,比如这个就是为list.html服务的
// 这个是为了配合webpack 将相应html文件对应的css和js导入进来
import list from '../../components/list/list.js';
list.init();
import '../../components/list/list.css';
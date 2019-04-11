// require 拥有的方法： resolve, main , extension , cache


console.log(require.resolve('./node_require.js')); //只解析路径，不执行文件
console.log(require.main);   //入口模块
console.log(require.extensions);  // 扩展模块， node里的模块有3种 1.js模块 2.json模块 3. node c++ 扩展二进制模块
console.log(require.cache);



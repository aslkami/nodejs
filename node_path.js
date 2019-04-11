const path = require('path')


console.log(path.join('a', 'b')); //  a\b
console.log(__dirname); // C:\Users\fate\Desktop\nodejs\nodejs
console.log(__filename); // C:\Users\fate\Desktop\nodejs\nodejs\node_path.js
console.log(path.resolve('..', '.', 'file.json'));  // C:\Users\fate\Desktop\nodejs\file.json


console.log(path.delimiter);  //环境变量路径分隔符， win32/posix 
console.log(path.sep);  //文件路径分隔符， win32/posix 


// console.log(path.relative()); //获得2个路径之间的相对路径
console.log(path.basename('fate.txt')); 
console.log(path.basename('fate.txt', '.txt')); 
console.log(path.extname('fate.txt')); 
console.log(path.dirname('fate.txt')); 



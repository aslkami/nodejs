const url = require('url')
const loc = 'http://localhost:3000/api?id=3#fate'

const urlObj = url.parse(loc)
console.log(urlObj);

const urlQueryObj = url.parse(loc, true)  // 第二个参数为true， query变成对象
console.log(urlQueryObj);

const initUlr = url.format(urlObj)
console.log(initUlr);
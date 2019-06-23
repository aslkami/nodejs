// 加密
const crypto = require('crypto')
// const str = 'fate'
// console.log(crypto.getHashes());
const md5 = crypto.createHash('sha1')
md5.update('hello')
md5.update('world')
const res = md5.digest('hex') // 16进制的输出格式
console.log(res);  
// fc5e038d38a57032085441e7fe7010b0
// 6adfb183a4a2c94a2f92dab5ade762a47889a5a1


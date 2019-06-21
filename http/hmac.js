// 加密
const crypto = require('crypto')
const hmac = crypto.createHmac('sha1', '')
hmac.update('123xxx')
const res = hmac.digest('hex')
console.log(res); 
//1c9f9d410237e2f938081ca392cafa70b22ce84e
//fa523c029068936322c05cc106cb0ad52a57cc22
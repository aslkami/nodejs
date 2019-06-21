// 对称性加密
const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const str = 'fate'
const pk = fs.readFileSync(path.join(__dirname, 'rsa_private.key'))
const cipher = crypto.createCipher('blowfish', pk)

cipher.update(str, 'utf8')
const res = cipher.final('hex')
console.log(res);


const decipher = crypto.createDecipher('blowfish', pk)
decipher.update(res, 'hex')
const deres = decipher.final('utf8')
console.log(deres)
const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const mime = require('mime')
const zlib = require('zlib')
const { promisify } = require('util')
let stat = promisify(fs.stat) // promise 化 获取文件信息

const server = http.createServer( async(req, res) => {
  const { pathname } = url.parse(req.url)
  const filepath = path.join(__dirname, pathname)
  try {
    const statInfo = await stat(filepath)
    console.log(statInfo);
    const acceptCoding = req.headers['accept-encoding'] // node 将所有请求头变成小写， 为了兼容浏览器
    res.setHeader('Content-type', mime.getType(pathname)) // 获取文件类型
    if (acceptCoding) {
      if (acceptCoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip')
        fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res)
      } else if (acceptCoding.match(/\deflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate')
        fs.createReadStream(filepath).pipe(zlib.createDeflate()).pipe(res)
      } else {
        fs.createReadStream(filepath).pipe(res)
      }
    }
  } catch (e) {
    res.statusCode = 404
    res.end()
  }

})

server.listen('8080')

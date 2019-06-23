const http = require("http");
const url = require("url");
const path = require("path");
const mime = require('mime')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  const filepath = path.join(__dirname, pathname)
  fs.stat(filepath, (err, stat) => {
    if (err) {
      return showError(res)
    }

    const ifModifiedSince = req.headers['if-modified-since']
    const LastModified = stat.ctime.toGMTString()
    if (ifModifiedSince === LastModified) {
      res.writeHead(304)
      res.end()
    } else {
      send(res, stat, filepath)
    }
  })
})

function showError(res) {
  res.end('404 NOT FOUND')
}

function send(res, stat, filepath) {
  res.setHeader('Content-Type', mime.getType(filepath))
  res.setHeader('Last-Modified', stat.ctime.toGMTString())
  fs.createReadStream(filepath).pipe(res)
}

server.listen('8080')

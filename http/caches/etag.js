const http = require("http");
const url = require("url");
const path = require("path");
const mime = require("mime");
const fs = require("fs");
const crypto = require("crypto");

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const filepath = path.join(__dirname, pathname);
  fs.stat(filepath, (err, stat) => {
    if (err) {
      return showError(res);
    }

    const ifNoneMatch = req.headers["if-none-match"];
    const out = fs.createReadStream(filepath)
    const md5 = crypto.createHash('md5')
    out.on('data', data => {
      md5.update(data)
    })
    out.on('end', _ => {
      const etag = md5.digest('hex')
      // 06d79dc3298107fed116cd5d77e4b089
      if (ifNoneMatch === etag) {
        res.writeHead(304);
        res.end();
      } else {
        return send(res, etag, filepath);
      }
    })
  });
});

function showError(res) {
  res.end("404 NOT FOUND");
}

function send(res, etag, filepath) {
  res.setHeader("Content-Type", mime.getType(filepath));
  res.setHeader("ETag", etag);
  fs.createReadStream(filepath).pipe(res);
}

server.listen("8080");

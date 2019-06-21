const http = require('http')
const url = require('url')
const server = http.createServer()

// request, connection, error, close
//  curl -v -data "name=1111" -X PUT localhost:8080
server.on('request', (req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
  const urlInfo = url.parse(req.url)
  console.log(urlInfo);
  const result = []
  server.on('data', data => {
    result.push(data)
  })

  server.on('end', _ => {
    server.end(result)
  })
})

server.on('connection', (req, res) => {
  console.log('客户端连接');
})

server.listen('8080', () => {
  console.log('server:8080');
})
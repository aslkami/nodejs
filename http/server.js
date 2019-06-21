const http = require('http')
const server = http.createServer()
const querystring = require('querystring')
server.on('request', (req, res) => {
  console.log(req.url);
  console.log(req.method);
  let arr = []
  req.on('data', data => {
    arr.push(data)
  })

  req.on('end', _ => {
    let body
    let buff = Buffer.concat(arr).toString()
    console.log(buff);
    body = querystring.parse(buff)
    console.log(body);
    res.end(JSON.stringify(body))
  })
})

server.listen('8080')
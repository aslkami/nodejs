const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'text/html') // 此时还没发送头部
  // console.log(res.headersSent); // 是否发送头部
  res.writeHead(200, {   // 只有write或者writeHead 才发送头部
    "Content-Type": "text/html;chartset=uth8"
  })

  res.statusCode = 200
  res.sendDate = false // 不响应 date 信息
  res.end()
}).listen('4796')

server.on('connection', socket => {
  socket.on('end', _ => {
    console.log('结束了');
  })
  socket.on('close', _ => {
    console.log('断开了');
  })
})
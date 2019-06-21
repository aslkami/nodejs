const net = require('net')
const fs = require('fs')
const path = require('path')
const ws = fs.createWriteStream(path.join(__dirname, 'tcp.txt'))
const rs = fs.createReadStream()

let server = net.createServer()
// , 不能大于 65535  tcp头里用16位表示一个逗号
server.on('connection', (socket)=>{
  socket.pause()

  socket.setTimeout(3 * 1000)   // 超过一定时间，判定超时

  // write after end 在文件关闭后 再次写入
  // setTimeout(()=>{
  //   socket.pipe(ws, { end: false})  // 默认情况下, 当可读流读到末尾的时候会关闭可写流
  // }, 10000)

  socket.on('timeout', ()=>{
    console.log('timeout');
    socket.pipe(ws, { end: false })  // 默认情况下, 当可读流读到末尾的时候会关闭可写流
  })
})

server.listen(8080)


let server2 = net.createServer()
server2.on('connection', (socket)=>{
  rs.on('data', (data)=>{
    let flag = socket.write(data)     //可写流缓冲区是否满了 true没有满
    // socket.bufferSize  缓冲区字节大小
  })

  socket.on('drain', ()=>{
    console.log('TCP缓冲区的数据已经发送');
  })
})
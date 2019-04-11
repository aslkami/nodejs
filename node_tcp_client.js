const net = require('net')

let socket = new net.Socket()

socket.connect(8080, 'localhost', ()=>{
  socket.write('hello world')
})

socket.setEncoding('utf8')


socket.on('data', (data)=>{
  console.log('服务器发来数据:',  data);
})

setTimeout(()=>{
  socket.end()
}, 10000)
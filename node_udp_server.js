const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

socket.bind('3306', 'localhost') // 监听的端口主机
socket.on('message', (buff, rinfo) => {
  console.log(buff.toString());
  console.log(buff.length);
  console.log(rinfo);
  socket.send(Buffer.from(buff), 0, buff.length, rinfo.port, rinfo.address)
})

const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

let buff = Buffer.from('圣杯战争')
socket.send(buff, 0 ,6 , 3306, 'localhost', (err, bytes) => {
  console.log(arguments);
})

socket.on('message', (buff, rinfo) => {
  console.log(buff.toString());
})
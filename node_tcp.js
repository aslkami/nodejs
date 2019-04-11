const net = require('net')

// server 是一个双工流duplex 可读可写
/*
let server = net.createServer((socket)=>{
  console.log('客户端已经连接了');
  console.log(socket.address());
  socket.on('data', (data)=>{
    console.log('接收到客户端发来的数据:%s %s', data);
    socket.write("服务器确认:" +  data)
  })

  socket.on('error', (error)=>{
    console.log(error);
  })

  socket.on('end', (error) => {
    console.log('end');
  })
})

server.listen(8080, ()=>{
  console.log(server.address());
  console.log('服务器已经启动');
})  
*/



let server = net.createServer({}, (socket)=>{
  console.log(socket.address());

  server.maxConnections = 2   //最多只能连接2个
  server.getConnections((err, count)=>{
    console.log(`当前连接数${count}个， 最大连接数${server.maxConnections}`);
  })


  socket.setEncoding('utf8')
  socket.on('data', (data)=>{
    console.log('来自客户端的数据:', data);
    socket.write('fatezero')
  })

  socket.on('end', (end) => {
    console.log('客户端关闭了与服务器的连接');
    // server.unref() // 执行此方法, 当所有链接关闭后,关闭服务器
  })

  socket.on('close', (hasError) => {
    console.log('客户端真正关闭');
    console.log(`有错误, ${hasError}`);
  })

  socket.on('error', (error) => {
    console.log(error);
  })


  // setTimeout(()=>{
  //   server.close()   //10s后关闭链接，当前的连接仍然存在, 好比去宵夜档, 喝酒喝的晚,店家10秒后不接客, 但是要等喝酒的人走了才能关门打烊
  // },10000)
})

server.on('close', ()=>{
  console.log('服务器关闭');
})

server.listen(8080, ()=>{
  console.log(server.address());
  console.log('服务器已经启动');
})


server.on('connection', ()=>{})
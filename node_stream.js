const fs = require('fs')
/**
 * 可读流
 */
let rs = fs.createReadStream('./demo.txt', {
  highWaterMark: 4,   //缓冲区大小
  start: 3,
  end: 8,  //包左也包右
  mode: 0o666,
  flags: 'r',
  // encoding: 'utf8'
})
// rs.setEncoding('utf8')
rs.on('open', (open) => {
  console.log(open);
  console.log('打开');
})
rs.on('data', (data)=>{
  console.log(data);
  rs.pause() //暂停读取和发射data事件
  setTimeout(()=>{
    rs.resume()   //恢复
  }, 2000)
})
rs.on('error', (error) => {
  console.log(error);
})
rs.on('end', (end) => {
  console.log('读取完毕');
})
rs.on('close', (close) => {
  console.log('关闭');
})


/**
 * 可写流
 */

let ws = fs.createWriteStream('./stream.txt', {
  mode: 0o666,
  flags: 'w',
  encoding: 'utf8',
  start: 0,
  highWaterMark: 3
})

// 返回true可以继续写，false不能写，但是会缓存到内存，等缓冲区输出完了，再放进去（理论是不能继续写的，但是最终还是写进去了）
// let bool = ws.write('1')
// console.log(bool);
// bool = ws.write('2')
// console.log(bool);
// bool = ws.write('3')
// console.log(bool);
// bool = ws.write('4')
// console.log(bool);


// 抽干方法 当都写入完后会触发drain事件
// 必须缓存区满了 满了后被清空了才会出发drain
ws.on('drain', function () {
  console.log('drain')
});
// rs.pipe(ws)
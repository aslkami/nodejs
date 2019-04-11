const fs = require('fs')

/**
 *  r   读取文件， 文件不存在报错
 *  r+  读取并写入，文件不存在报错
 *  rs  同步读取文件并忽略缓存
 *  w   写入文件，不存在则创建，存在则清空
 *  wx  排他写入文件
 *  w+  读取并写入文件，不存在则创建，存在则清空
 *  wx+ 和w+类似，排他方式打开
 *  a   追加写入
 *  ax  与a类似，排他方式写入
 *  a+  读取并追加写入，不存在则创建
 *  ax+ 作用与a+类似，但是以排他方式打开文件
 */

// 文件不存在，r+不会创建， w+会创建
// 文件存在，r+不会清空内容， w+会清空内容


let params = {
  encoding: 'utf8',
  // flag: 'r',
  // mode: 0o666
}

fs.readFile('./file.json', params, function(err, data){
  // if(err) {
  //   console.log(err);
  // }else {
  //   console.log(data);
  // }
})



// 当文件非常大的时候，则使用 fs.open  fs.read
// fd, file descriptor  0: 标准输入  1：标准输出  2：错误输出
// process.stdin.on('data', function(data){
//   console.log(data);
// })

fs.open('./file.txt', 'r', 0o666, function(err, fd){
  console.log(fd);
  let buff = Buffer.alloc(6)
  fs.read(fd, buff, 0, 4, 1, function(err, bytesRead){
    // console.log(buff);
    // console.log(bytesRead);
    // console.log(buff.toString());
  })
})

// fs.open('./file.txt', 'a', 0o666, function(err, fd){
//   let buff = Buffer.from('圣杯传说')
//   fs.write(fd, buff, 6, 6, 3, function(err, written){
//   }) 
// })







const BUFFER_SIZE = 3
function copy(src, target) {
  fs.open(src, 'r', 0o666, function(err, readFD){
    fs.open(target, 'w', 0o666, function(err, writeFD){
      let buff = Buffer.alloc(BUFFER_SIZE)
      function start() {
        // 读取文件里的内容（3个字节 3个字节的读取），读取内容放在buff缓冲区， 再把缓冲区里的内容写到文件里
        fs.read(readFD, buff, 0, BUFFER_SIZE, null, function(err, readBytes){
          console.log(buff);
          console.log(readBytes);
          if(readBytes > 0) {
            fs.write(writeFD, buff, 0, readBytes, null, start)
          }
        })
      }
      start()
    })
  })
}

// copy('./demo.txt', './demo_copy.txt')




// fs.access()
// fs.constants.R_OK
// fs.mkdir





let str = '圣杯'
fs.open('./demo2.txt', 'w', 0o666, (err, fd)=> {
  let buff = Buffer.from(str)
  fs.write(fd, buff, 0, 3, null, (err, written)=>{
    console.log(written);
    fs.write(fd, buff, 3, 3, null, (err, written) => {
      //输出缓冲区并写入物理文件，清空缓存
      fs.fsync(fd, ()=>{
        fs.close(fd, ()=>{
          console.log('关闭');
        })
      })
    })
  })
})
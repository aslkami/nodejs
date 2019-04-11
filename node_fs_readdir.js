const fs = require('fs')
const path = require('path')

// fs.stat
// fs.rename
// fs.truncate // 截断文件
// fs.unlink // 删除文件
// fs.redir  // 删除文件夹

function rmDirSync(dir){
  let files = fs.readdirSync(dir)
  files.forEach(item => {
    let curPath = path.join(dir, item)
    let child = fs.statSync(curPath)
    console.log(curPath);
    console.log(child);
    
    if(child.isDirectory()) {
      rmDirSync(curPath)
    }else{
      fs.unlinkSync(curPath)
    }
  })
  fs.rmdirSync(dir)  //所有文件删除掉，才删除文件夹
}

// rmDirSync('./express.1')



function rmDir(dir){
  return new Promise((resolve, reject)=>{
    fs.stat(dir, (err, stats)=>{
      if(stats.isDirectory()) {
        fs.readdir(dir, function (err, files) {
          if (err) {
            reject(err)
          }

          Promise.all(files.map(v => rmDir(path.join(dir, v)))).then(()=>{
            fs.rmdir(dir, resolve)
          })
        })
      } else {
        fs.unlink(dir, resolve)
      }
    })
  })
} 


rmDir('./express.2').then((data)=>{
  console.log(data);
}).catch((e)=>{
  console.log(e);
})
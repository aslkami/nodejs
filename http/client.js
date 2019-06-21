const http = require('http')
const options = {
  host: 'localhost',
  port: 8080,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

// 通用头，请求头，响应头，实体头
const req = http.request(options)  // req是可写流

req.on('response', (res) => {
  let arr = []
  res.on('data', data => {
    arr.push(data)
  })

  res.on('end', _ => {
    let buff = Buffer.concat(arr)
    console.log(buff.toString());
  })
})
req.write('name=fate&age=18')  // 向请求体写数据
req.end()


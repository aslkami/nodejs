// 静态资源服务器
const http = require('http')
const chalk = require('chalk')
const debug = require('debug')('statics:app') // 目录名:模块名, 根据不同环境变量打印不同的值
const config = require('./config/config')
const { promisify, inspect } = require('util')
const fs = require("fs");
const path = require("path");
const url = require('url')
const handlebars = require('handlebars')
const mime = require('mime')
const stat = promisify(fs.stat); 
const readdir = promisify(fs.readdir); 
function getList() {
  const html = fs.readFileSync(path.resolve(__dirname, 'tpl', 'list.html'), 'utf8')
  return handlebars.compile(html)
}

class Server {
  constructor () {
    this.list = getList()
    // this.start()
  }
  start() {
    const server = http.createServer()
    server.on('request', this.request.bind(this))
    server.listen(config.port, _ => {
      const url = `http://${config.host}:${config.port}`
      debug(`server running at ${chalk.green(url)}`);
    })
  }
  async request(req, res) {
    const { pathname } = url.parse(req.url); // images
    const filepath = path.join(config.root, pathname) // E:\www\nodejs\http\statics\public\images
    try {
      const statObj = await stat(filepath);
      if (statObj.isDirectory()) {
        let files = await readdir(filepath);
        // console.log(files); // [ 'home', 'sasaki_nozomi.jpg' ]
        files = files.map(v => {
          return {
            name: v,
            url: path.join(pathname, v)
          };
        })
        const htmlData = this.list({
          title: pathname,
          files
        })
        res.setHeader('Content-Type', 'text/html')
        res.end(htmlData)
      } else {
        this.sendFile(res, filepath)
      }
    } catch (error) {
      // console.log(error);
      debug(inspect(error))  // 将 [object, object] 展开为标准对象 {name: xxx, url: xxx}
      this.sendError(res)
    }
  }
  sendError(res) {
    res.statusCode = 500
    res.end('something wrong!')
  }
  sendFile(res, filepath) {
    res.setHeader('Content-type', mime.getType(filepath))
    fs.createReadStream(filepath).pipe(res)
  }
}

const instance = new Server()
instance.start()
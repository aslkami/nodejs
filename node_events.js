let EventEmitter = require('events')  //事件驱动
let util = require('util')  //工具类

function Bell () {
  EventEmitter.call(this)  // 继承私有属性
}

// Bell()
util.inherits(Bell, EventEmitter)  //子类继承父类的公有方法


let bell = new Bell()
console.log(Bell);
console.log(bell);
function student(){
  console.log('学生进教室');
}
function teacher() {
  console.log('老师进教室');
}
bell.on('ringing', student)  // 注册事件
bell.on('ringing', teacher) 
bell.emit('ringing')   // 执行事件


//EventEmitter拥有 addListener, removeListener, once, setMaxListeners 等方法



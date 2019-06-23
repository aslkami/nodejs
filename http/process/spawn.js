const path = require("path");
const { spawn } = require('child_process')

const p1 = spawn('node', ['test1.js', 'a'], {
  cwd: path.join(__dirname, 'test1.js')
})

const p2 = spawn("node", ["test3.js", "a"], {
  cwd: path.join(__dirname, "test3.js"),
  stdio: 'pipe'
});

p1.stdout.on('data', data => {
  p2.stdin.write(data)  // 把数据写给p2
})

p1.on('error', e => {
  console.log('子进程1开启失败');
})

p2.on("error", e => {
  console.log("子进程2开启失败");
});

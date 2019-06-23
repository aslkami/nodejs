const yargs = require('yargs')

const argv = yargs.options('n', {
  alias: 'name',
  demand: true,     // 要求必须有
  default: 'fate',   // 默认
  description: '请输入姓名',
  // type: 'string',
  // boolean: true
})
// .usage('help[options]')
// .help()
.example('这是example')
.alias('h', 'help')
.argv


console.log(argv);

console.log(argv.name);  // 识别 -- 的参数
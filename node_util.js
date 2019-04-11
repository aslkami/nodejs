let util = require('util')  //工具类
let obj = {
  province: {
    name: '广东',
    city: {
      name: '深圳'
    }
  }
}

console.log(util.inspect(obj, {depth: 2}));

// util 有 inherited, inspect等等
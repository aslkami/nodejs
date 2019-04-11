const fs = require('fs')

fs.watchFile('de.txt', (curr, prev) => {
  console.log(prev.ctime);
  console.log(curr.ctime);
  if (Date.parse(prev.ctime) == 0){
    console.log('新增');
  } else if (Date.parse(curr.ctime) == 0) {
    console.log('删除');
  } else if (Date.parse(prev.ctime) != Date.parse(curr.ctime)) {
    console.log('修改');
  }
})
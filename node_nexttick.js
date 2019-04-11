new Promise(function(resolve, reject){
  console.log('Promise');
  resolve()
}).then(function(){
  console.log('then');
})


console.log('start');


process.nextTick(function(){
  console.log('nextTick');
})


setTimeout(() => {
  new Promise(function (resolve, reject) {
    console.log('Promise2222');
    resolve()
  }).then(function () {
    console.log('then2222');
  })
  process.nextTick(function () {
    console.log('nextTick2222');
  })
}, 1000);

console.log('end');

//以上代码在node环境里 依次执行
//Promise
//start
//end
//nextTick
//then
//Promise2222
//nextTick2222
//then2222
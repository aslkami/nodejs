console.time('time');
let i = 0
while(i++ < 100000) {

}
console.timeEnd('time');


// let a = {
//   fate: {
//     zero: 'saber'
//   }
// }
// console.dir(a)   // 列出对象的结构

// console.log(process);

console.log(process.cwd());
process.chdir('..')  // change dir
console.log(process.cwd());

console.log(process.memoryUsage()); // v8 引擎最大 内存 1.7G

console.log(parseInt("0x10", 16)) //任意进制转化成10进制
let twenty = 0x24
console.log(twenty.toString(2)); // 任意进制转化成N进制
console.log(parseInt(twenty.toString(2)));



// let r = transfer(0x4E07)  // "万"字
let b = parseInt('0x4E07'.toString(2))  // 100 111000 000111
// 1110xxxx 10xxxxxx 10xxxxxx
//     0100   111000   000111
// 将二进制从后往前6位补充，不够位数则用0填充

console.log(0b11100100.toString(16)); //e4
console.log(0b10111000.toString(16)); //b8
console.log(0b10000111.toString(16)); //87
console.log(Buffer.from('万'));


// FFFF 
// 15*16^3 + 15*16^2 + 15*16 + 15
// 61440   + 3840    +  240  + 15

let F = 0xFFFF
console.log(F.toString(2));
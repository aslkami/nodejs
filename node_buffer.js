let buff1 = Buffer.alloc(6,3)  //分配一个长度为6字节的BUffer，会把所有的字节设置为0 ， 第二个参数提供默认值
let buff2 = Buffer.allocUnsafe(6)  // 不安全
let buff3 = Buffer.from('圣')
let buff4 = Buffer.alloc(4)
buff4.fill(3,1,3)  // param（值，开始索引，结束索引） 包左不包右
let buff5 = Buffer.alloc(6)
buff5.write('圣', 0, 3, 'utf8')
buff5.write('杯', 3, 3, 'utf8') 

let buff6 = Buffer.alloc(1)
buff6.writeInt8(0b100, 0)   //写入8位的整数，也就是一个字节的整数 

let buff7 = Buffer.alloc(4)  // 256 = 0x0100, 分成2个字节  01 和 00， 01为高位， 00为低位
buff7.writeInt16BE(256, 0)   //高位在前，低位在后，从索引为0的地方存2个，则为[01, 00, 00, 00]
buff7.writeInt16LE(256, 2)   //低位在前，高位在后，从索引为2的地方存2个，则为[01, 00, 00, 01]
let r7 = buff7.readUInt16BE(0)  //怎么存怎么读


let buff8 = Buffer.alloc(6, 1)
let buff9 = buff8.slice(2)
buff9.fill(4)



let {StringDecoder} = require('string_decoder')
let buff10 = Buffer.from('圣杯战争')
let buff11 = buff10.slice(0, 5)
let buff12 = buff10.slice(5)


let SD = new StringDecoder()  //截取乱码 会判断是否够字节数，把不完整的缓存起来下次再用
let sd1 = SD.write(buff11)
let sd2 = SD.write(buff12)


// isBuffer  length  copy  concat 

console.log(buff1);
console.log(buff2);
console.log(buff3);
console.log(buff4);
console.log(buff5.toString());
console.log(buff6);
console.log(buff7);
console.log(r7);
console.log(buff8);
console.log(buff9);
console.log(buff11.toString());
console.log(buff12.toString());
console.log(sd1);
console.log(sd2);



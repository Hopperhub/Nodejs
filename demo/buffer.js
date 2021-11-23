const buf = Buffer.from('hey!');

console.log('buf:', buf[1]);
console.log('buf 内容：', buf.toString());

// 长度
console.log('len:', buf.length);

buf[1] = 121;
console.log(buf.toString());

// copy
const bufCopy = Buffer.alloc(2);
buf.copy(bufCopy, 0, 0, 2);
console.log('bufCopy:', bufCopy.toString());

// 切片
const buf1 = buf.slice(0, 2);
buf[1] = 111;
console.log('buf1:', buf1.toString());
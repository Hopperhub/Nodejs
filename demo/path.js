const path = require('path');

const data1 = '/Users/user/Documents/hopper/nodejs-learn/path.js';
const data2 = 'path.js';
// 读取数据
console.log('path basename:', path.basename(data1));
console.log('path dirname:', path.dirname(data1));
console.log('path extname:', path.extname(data1));
console.log('是否是绝对路径:', path.isAbsolute(data2));

// 路径拼接
console.log('join 拼接：', path.join(path.dirname(data1), data2));
console.log('计算的地址：', path.normalize('/Users/..//path.js'));
console.log('路径解析：', path.parse(data1));
console.log('resolve 绝对路径：', path.resolve(data2));
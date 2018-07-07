var fs = require('fs');

// 阻塞代码实例
var data = fs.readFileSync('test.txt');

console.log(data.toString());
console.log('阻塞程序执行结束');

// 非阻塞代码实例
fs.readFile('test1.txt', (err, data) => {
    if (err) return console.error(err.stack);
    console.log(data.toString());
});
console.log('非阻塞程序执行结束');
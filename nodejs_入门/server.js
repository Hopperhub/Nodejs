const http = require('http'); // 载入 http 模块
const fs = require('fs');

fs.readFile('test.txt', (err, data) => {
    console.log(err);
    console.log(data); // Buffer（数据类型）: 缓冲区，二进制的数组，使数据保持二进制的状态，可以兼容文字、图片、视频... 
})
fs.writeFile('test1.txt', '写入的数据', err => {
    console.log(err);
})

http.createServer((request, response) => { // createServer 方法创建服务器; listen 方法绑定 8080 端口

    // 发送 HTTP 头部
    // 状态值 200：ok
    // 内容类型：text/plain
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    // 发送响应数据
    response.write('123');
    response.end();
    // response.end('hello world'); // 响应
}).listen(3000);

// 终端 log
console.log('Server running');
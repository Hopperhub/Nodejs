var http = require('http'); // 载入 http 模块

http.createServer((request, response) => { // createServer 方法创建服务器; listen 方法绑定 8080 端口

    // 发送 HTTP 头部
    // 状态值 200：ok
    // 内容类型：text/plain
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    // 发送响应数据 
    response.end('hello world'); // 响应
}).listen(8080);

// 终端 log
console.log('Server running');
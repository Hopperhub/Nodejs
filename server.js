const http = require('http');
const fs = require('fs');
const url = require('url');

const mysql = require('mysql');
const io = require('socket.io');

// 数据库
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

// 服务器
const app = http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true);
    switch (pathname) {
        case '/reg': // 注册
            console.log(query);
            break;
        case '/login': // 登录
            console.log(query);
            break;
        default: // 请求资源文件
            fs.readFile(`www${req.url}`, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.write('Not Found');
                } else {
                    res.write(data);
                }
                res.end();
            });
            break;
    }
});
app.listen(3000);


/**
 * 接口：
 * 用户注册： /reg?username=xxx&password=xxx
 * 用户登录： /login?username=xxx&password=xxx
 * 返回：{code: 0, msg: '信息'}；code 的值为 0 时，表示成功，反之则表示失败
 */

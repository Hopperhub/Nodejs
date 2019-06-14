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
    const {pathname, query} = url.parse(req.url, true);
    const {username, password} = query
    switch (pathname) {
        case '/reg': // 注册
            // 数据校验
            if (!/^\w{6,32}$/.test(username)) {
                res.write(JSON.stringify({code: 1, msg: '用户名不符合规范'}));
                res.end();
            } else if (!/^.{6,32}$/.test(password)) {
                res.write(JSON.stringify({code: 1, msg: '密码不符合规范'}));
                res.end();
            } else {
                pool.query(`SELECT * FROM user_table WHERE username='${username}'`, (err, data) => {
                    if (err) {
                        res.write(JSON.stringify({code: 1, msg: '数据库错误'}));
                        res.end();
                    } else if (data.length > 0) {
                        res.write(JSON.stringify({code:1, msg: '用户名已存在'}));
                        res.end();
                    } else {
                        pool.query(`INSERT INTO user_table (username, password, online) VALUES ('${username}', '${password}', 0)`, err => {
                            if (err) {
                                res.write(JSON.stringify({code: 1, msg: '数据库错误'}));
                            } else {
                                res.write(JSON.stringify({code:0, msg: '注册成功'}));
                            }
                            res.end();
                        })
                    }
                });
            }
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

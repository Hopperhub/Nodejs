const http = require('http');
const fs = require('fs');
const url = require('url');

const mysql = require('mysql');
const io = require('socket.io');

const regs = require('./libs/regs.js');

// 数据库
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

// 服务器
const app = http.createServer((req, res) => {
    console.log(req.headers);
    const {pathname, query} = url.parse(req.url, true);
    const {username, password} = query;
    switch (pathname) {
        case '/reg': // 注册
            // 数据校验
            if (!regs.username.test(username)) {
                res.write(JSON.stringify({code: 1, msg: '用户名不符合规范'}));
                res.end();
            } else if (!regs.password.test(password)) {
                res.write(JSON.stringify({code: 1, msg: '密码不符合规范'}));
                res.end();
            } else {
                pool.query(`SELECT ID FROM user_table WHERE username='${username}'`, (err, data) => {
                    if (err) {
                        res.write(JSON.stringify({code: 1, msg: '数据库错误'}));
                        res.end();
                    } else if (data.length > 0) {
                        res.write(JSON.stringify({code: 1, msg: '用户名已存在'}));
                        res.end();
                    } else {
                        pool.query(`INSERT INTO user_table (username, password, online) VALUES ('${username}', '${password}', 0)`, err => {
                            if (err) {
                                res.write(JSON.stringify({code: 1, msg: '数据库错误'}));
                            } else {
                                res.write(JSON.stringify({code: 0, msg: '注册成功'}));
                            }
                            res.end();
                        })
                    }
                });
            }
            break;
        case '/login': // 登录
            if (!regs.username.test(username)) {
                res.write(JSON.stringify({code: 1, msg: '用户名不符合规范'}));
                res.end();
            } else if (!regs.password.test(password)) {
                res.write(JSON.stringify({code: 1, msg: '密码不符合规范'}));
                res.end();
            } else {
                pool.query(`SELECT ID, password FROM user_table WHERE username='${username}'`, (err, data) => {
                    if (err) {
                        res.write(JSON.stringify({code: 1, msg: '数据库错误'}));
                        res.end();
                    } else if (data.length === 0) {
                        res.write(JSON.stringify({code: 1, msg: '用户不存在，请注册！'}));
                        res.end();
                    } else if (data[0].password !== password) {
                        res.write(JSON.stringify({code: 1, msg: '用户名或密码不正确'}));
                        res.end();
                    } else {
                        pool.query(`UPDATE user_table SET online=1 WHERE ID=${data[0].ID}`, err => {
                            if (err) {
                                res.write(JSON.stringify({code: 1, msg: '数据库错误'}));
                                res.end();
                            } else {
                                res.write(JSON.stringify({code: 0, msg: '登录成功'}));
                                res.end();
                            }
                        });
                    }
                });
            }
            break;
        default: // 请求资源文件
            fs.readFile(`www${pathname}`, (err, data) => {
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

// websocket
const ws = io.listen(app);
let sockArr = []; // 存通信的 sock ，用于广播
ws.on('connection', sock => {
    sockArr.push(sock);

    let curUser = '';
    let curUserId = '';

    sock.on('reg', (username, password) => {
        if (!regs.username.test(username)) {
            sock.emit('reg_ret', 1, '用户名不符合规范');
        } else if (!regs.password.test(password)) {
            sock.emit('reg_ret', 1, '密码不符合规范');
        } else {
            pool.query(`SELECT ID FROM user_table WHERE username='${username}'`, (err, data) => {
                if (err) {
                    sock.emit('reg_ret', 1, '数据库错误');
                } else if (data.length > 0) {
                    sock.emit('reg_ret', 1, '用户名已存在');
                } else {
                    pool.query(`INSERT INTO user_table (username, password, online) VALUES ('${username}', '${password}', 0)`, err => {
                        if (err) {
                            sock.emit('reg_ret', 1, '数据库错误');
                        } else {
                            sock.emit('reg_ret', 0, '注册成功');
                        }
                    })
                }
            })
        }
    });
    sock.on('login', (username, password) => {
        if (!regs.username.test(username)) {
            sock.emit('login_ret', 1, '用户名不符合规范');
        } else if (!regs.password.test(password)) {
            sock.emit('login_ret', 1, '密码不符合规范');
        } else {
            pool.query(`SELECT ID,password FROM user_table WHERE username='${username}'`, (err, data) => {
                if (err) {
                    sock.emit('login_ret', 1, '数据库错误');
                } else if (data.length === 0) {
                    sock.emit('login_ret', 1, '用户名不存在');
                } else if (data[0].password !== password) {
                    sock.emit('login_ret', 1, '用户名或密码不正确');
                } else {
                    pool.query(`UPDATE user_table SET online=1 WHERE ID=${data[0].ID}`, err => {
                        if (err) {
                            sock.emit('login_ret', 1, '数据库错误');
                        } else {
                            sock.emit('login_ret', 0, '登录成功');
                            curUser = username;
                            curUserId = data[0].ID;
                        }
                    })
                }
            });
        }
    });
    sock.on('msg', txt => {
        if (!txt) sock.emit('msg_ret', 1, '内容不能为空');
        sockArr.forEach(item => { // 广播
            if (item === sock) return;
            item.emit('msg', curUser, txt);
        });
        sock.emit('msg_ret', 0, '发送成功', curUser, txt);
    });
    sock.on('disconnect', () => {
        pool.query(`UPDATE user_table SET online=0 WHERE ID=${curUserId}`, err => {
            if (err) {
                console.log(`数据库错误：${err}`);
            }
            curUser = '';
            curUserId = 0;
            sockArr = sockArr.filter(item => item !== sock);
        })
    })
});


/**
 * 接口：
 * 用户注册： /reg?username=xxx&password=xxx
 * 用户登录： /login?username=xxx&password=xxx
 * 返回：{code: 0, msg: '信息'}；code 的值为 0 时，表示成功，反之则表示失败
 */

/**
 * ws 接口
 * 客户端发送：'reg', username, password => 服务端返回： 'reg_ret', code, msg
 * 'login', username, password => 'login_ret', code, msg
 * 'msg', txt => 'msg_ret', code, msg
 *            => 'msg', username, msg
 */

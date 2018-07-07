/* 原生的实现方式 */
const http = require("http");
const url = require("url");
const mysql = require('mysql');

const port = 8080;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'websocket'
});

const server = http.createServer((req, res) => {
    //TODO 研究
    res.setHeader('Access-Control-Allow-Origin', '*'); // 解决 CORS 跨域

    const {
        pathname,
        query
    } = url.parse(req.url, true);

    if (pathname === "/reg") {
        /* 登录接口 
        字段：1.username 2.password
        返回：{code,msg}
            - 成功：code=0    失败：code=1
        */
        const {
            username,
            password
        } = query;

        // 检验数据
        if (!/^.{6,32}$/.test(username)) {
            res.write(JSON.stringify({
                code: 1,
                msg: "用户名不符合规范"
            }));
            res.end();
        } else if (!/^.{6,32}$/) {
            res.write(JSON.stringify({
                code: 1,
                msg: "密码不符合规范"
            }));
            res.end();
        } else {
            // 检验用户名是否重复
            db.query(`SELECT * FROM user_table WHERE username='${username}'`, (err, data) => {
                if (err) {
                    res.write(JSON.stringify({
                        code: 1,
                        msg: '数据库出错，请联系管理员'
                    }));
                    res.end();
                } else {
                    if (data.length) {
                        res.write(JSON.stringify({
                            code: 1,
                            msg: '该用户已经存在'
                        }));
                        res.end();
                    } else {
                        db.query(`INSERT INTO user_table (username,password,online) VALUES ('${username}','${password}',0)`, (err, data) => {
                            if (err) {
                                res.write(JSON.stringify({
                                    code: 1,
                                    msg: '数据库出错，请联系管理员'
                                }));
                                res.end();
                            } else {
                                res.write(JSON.stringify({
                                    code: 0,
                                    msg: '注册成功'
                                }));
                                res.end();
                            }
                        });
                    }
                }
            });
        }
    }
});

server.listen(port);
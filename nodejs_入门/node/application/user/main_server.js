// 接口定义：
// /user?act=register&user=hopper&password=123456
// /user?act=login&user=hopper&password=123456
// reponse_data: {"ok": true} / {"ok": false, "msg": "error message"}

const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
const urlLib = require("url");

let userData = {}; // 暂存用户数据。格式：｛user:password｝

let server = http.createServer((req, res) => {
    let str = "";

    // 获取、解析数据
    req.on("data", (data) => {
        str += data;
    });
    req.on("end", () => {
        const obj = urlLib.parse(req.url, true);
        const url = obj.pathname;
        const getData = obj.query;
        const postData = querystring.parse(str);

        // 区分：接口、文件        
        if (url === "/user") { // 接口
            // 判断操作类型
            switch (getData.act) {
                case "register": // 注册
                    // 判断用户是否已存在
                    if (userData[getData.user]) {
                        res.write('{"ok": false,"msg": "用户已存在"}');
                    } else {
                        userData[getData.user] = getData.password;
                        res.write('{"ok": true,"msg": "注册成功"}');
                    }
                    break;
                case "login": // 登录
                    // 1.判读用户是否已存在
                    // 2.判断输入密码是否正确
                    if (userData[getData.user]) {
                        if (getData.password === userData[getData.user]) {
                            res.write('{"ok": true,"msg": "登录成功"}');
                        } else {
                            res.write('{"ok": false,"msg": "密码错误"}');
                        }
                    } else {
                        res.write('{"ok": false,"msg": "用户不存在"}');
                    }
                    break;
                default:
                    res.write('{"ok": false,"msg": "未知 act"}');
                    break;
            }
            res.end();
        } else { // 文件
            const fileName = `./www/user${url}`;

            fs.readFile(fileName, (err, data) => {
                if (err) {
                    res.write("404");
                } else {
                    res.write(data);
                }
                res.end();
            });
        }
    });
});

server.listen(8080);
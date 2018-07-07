const express = require('express');
const url = require('url');

const server = express();
server.listen(8080);

// 1. 接口
// server.use('/', (req, res) => {
//     res.send('aa');
// });
server.get('/aaa', (req, res, next) => {
    console.log(1);
    let {
        pathname,
        query
    } = url.parse(req.url, true);

    next(); // 下一步 -> 针对复杂的操作，分步执行
});
server.post('/', (req, res) => {});

server.get('/aaa', (req, res) => {
    console.log(2);
    let {
        pathname,
        query
    } = url.parse(req.url, true);

    res.send(query);
});

// 2. 静态文件
server.use(express.static('../nodejs_use/node1/www/')); // static: 会自动压缩文件 -> 中间件 

/* 
1.中间件 
    express 的功能都是通过中间件来实现的
    引用中间件：server.use()  
    常用中间件：
    - static 处理静态文件
    - body-parse body解析，post数据
       - server.use(bodyParser.urlencoded({}))
       - req.body -> post数据，全靠 body-parse 中间件得来

2. express 拆分处理步骤——next
    方法和地址都相同，才能next，但use 可以涵盖任何方法（post/get）和地址

3. express 使用get 数据，req.query

4. express 的核心在 express.use()
*/

// ——————————————————————————————————————————————————————————————————————
/* 
文件上传-multer
1. 引入、配置
const multer = require('multer');
let multerObj = multer({dest:'./xxx'});

2. 加给中间件
server.use(multerObj.any());

3. 用 files
req.files
*/

// ——————————————————————————————————————————————————————————————————————

/* 
响应方法：
- res.send
- res.sendFile 发送文件（文件权限，控制）
    - server.use(express.static()) // 自动发送，客户端要什么服务端给什么，不能控制
- res.sendStatus(code)  状态码
- res.redirect(url)     重定向
*/
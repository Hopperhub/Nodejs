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
3. express 使用get 数据，req.query
*/
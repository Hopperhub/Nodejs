/* 
原生实现（写）中间件 body-parser
*/
const express = require('express');
const querystring = require('querystring');
const logger = require('./my-logger');

const server = express();
server.listen(8080);

server.use(logger);

// body-parser 中间件实现
server.use((req, res, next) => {
    let str = ''; // 简单实现，平常不推荐

    req.on('data', data => {
        str += data;
    });

    req.on('end', () => {
        req.body = querystring.parse(str);
        next();
    });
});

server.post('/login', (req, res) => {
    console.log(req.body);
});

/* 
中间件设计思路

server.use((req,res,next)=>{
    // 处理
    ...

    next();
});
server.get(xxx);
*/
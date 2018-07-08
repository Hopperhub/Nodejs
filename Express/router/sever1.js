/* 路由 */

const express = require('express');

let server = express();
server.listen(8080);

server.use('/user', require('./routers/user')); // 引入主服务
server.use('/article', require('./routers/article'));
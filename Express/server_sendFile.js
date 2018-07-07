const express = require('express');

const server = express();
server.listen(8080);

server.get('/a', (req, res) => {
    if (req.query['pass'] == '12') {
        res.sendfile('./1.txt');
        res.end();
    } else {
        res.sendStatus(404, '没找到文件');
        res.end();
    }
})
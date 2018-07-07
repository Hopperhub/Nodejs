const myexpress = require('./my_express');
const logger = require('./middleware/my-logger');

const server = myexpress();
server.listen(8080);

server.get(logger);

server.get('/a', (req, res, next) => {
    console.log('aaa');
    next();
});

server.get('/a', (req, res) => {
    console.log('bbb');
    res.send('aabxxx');
    res.end();
});
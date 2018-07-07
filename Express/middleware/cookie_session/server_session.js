const express = require('express');
const cookieSession = require('cookie-session');

const server = express();
server.listen(8080);

// 字符串密钥
server.use(cookieSession({
    secret: [
        'aaadsaffffffffffffffeewf',
        'dfdadsfjifjajfio'
    ]
}));

server.get('/', (req, res) => {
    // console.log(req.session);

    // req.session['cash'] = 100;
    // res.end();
    if (req.session['count']) {
        req.session['count']++;
    } else {
        req.session['count'] = 1;
    }

    res.send(`第${req.session['count']}次访问`);
    res.end();
});
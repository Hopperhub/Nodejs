const http = require('http');
const querystring = require('querystring');

http.createServer((req, res) => {
    const url = req.url;
    let data = {};

    if (url.indexOf('?') !== -1) {
        data = querystring.parse(url.split('?')[1]);
    }

    res.end();
}).listen(8080);
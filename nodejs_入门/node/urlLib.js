const http = require('http');
const urlLib = require('url');

http.createServer((req, res) => {
    const json = urlLib.parse(req.url, true).query;
    res.end();
}).listen(8080);
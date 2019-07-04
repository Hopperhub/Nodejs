const http = require('http');
const url = require('url');

const origins = [
    'http://localhost:3000',
    'http://localhost:3001',
]
const app = http.createServer((req, res) => {
    const origin = req.headers.origin // ajax 2.0 的 headers 才有 origin 属性，origin: 表示资源工作的域，不能被设置
    if (origins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    const {pathname, query} = url.parse(req.url, true);
    if (pathname === '/jsonp') {
        const {a, b, cb} = query;
        res.write(`${cb}(${parseInt(a) + parseInt(b)})`);
    } else {
        res.write('123');
    }
    res.end();
});
app.listen(3001);
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const filePath = `www${req.url}`;
    fs.readFile(filePath, (err, data) => {
        if (err) {
            fs.readFile('www/errors/NotFound.html', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.write('服务器错误！');
                } else {
                    res.writeHead(404);
                    res.write(data);
                }
                res.end();
            });
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(3000);
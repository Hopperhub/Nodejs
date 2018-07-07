const http = require('http');
const fs = require('fs');

const port = 8080;

const httpServer = http.createServer((req, res) => {
    fs.readFile(`www${req.url}`, (err, data) => {
        if (err) {
            res.writeHeader(404); // 响应状态码
            res.write('Not found');
        } else {
            res.write(data);
        }

        res.end();
    });
});
httpServer.listen(port);
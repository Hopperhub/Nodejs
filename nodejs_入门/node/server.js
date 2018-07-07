const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const file_name = './www' + req.url;

    fs.readFile(file_name, (err, data) => {
        if (err) {
            res.write('404');
        } else {
            res.write(data);
        }
        res.end();
    });
});

server.listen(8080);
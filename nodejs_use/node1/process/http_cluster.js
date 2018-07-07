const http = require('http');
const url = require('url');
const fs = require('fs');
const cluster = require('cluster');
const os = require('os');
const process = require('process');

if (cluster.isMaster) { // 创建子进程
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else { // 负责干活
    http.createServer((req, res) => {
        console.log('进程', process.pid); // 把一个进程沾满，才使用下一个进程

        let {
            pathname,
            query
        } = url.parse(req.url, true);

        let rs = fs.createReadStream(`../www${pathname}`);
        rs.pipe(res);
        rs.on('error', err => {
            if (err) {
                res.writeHeader(404);
                res.write('Not Found');
                res.end();
            }
        })
    }).listen(8080); // 同一个体系之内的主子进程能够共享一个端口
}
/* 
1. server 处理大量接口
2. events 自定义事件
3. 模块单例的
*/
const http = require('http');
const url = require('url');
const fs = require('fs');
const router = require('../../libs/router');
const zlib = require('zlib');
const user = require('./routers/user');

const httpServer = http.createServer((req, res) => {
    const {
        pathname,
        query
    } = url.parse(req.url, true);

    req.query = query; // 把数据绑定给 req , 方便子模块使用

    res.send = (data) => {
        //data ->json
        //data ->array
        //data ->string
        //data ->buffer
        if (!(data instanceof Buffer) && typeof data != 'string') {
            data = JSON.stringify(data); // 把 json/array 转成字符串
        }
        res.write(data);
    }

    // 1. 是不是接口
    // 如果模块监听该事件，则是接口，事件名==接口名
    if (!router.emit(pathname, req, res)) {
        // 没有监听该事件，返回 false
        // 2. 读取文件
        const rs = fs.createReadStream(`../www${pathname}`);
        const gz = zlib.createGzip();
        let readSucc = true;
        res.setHeader('Content-Encoding', 'gzip');
        rs.pipe(gz).pipe(res);


        //FIXME BUG ??
        rs.on('error', err => {
            // 3. 读取失败
            console.log('读取失败', err);
            readSucc = false;

            res.writeHeader(404);
            res.write('Not Found');
            res.end();
        });

        if (readSucc) {
            console.log(111);

        }
    }

});
httpServer.listen(8080);
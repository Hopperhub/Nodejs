const http = require('http');
const querystring = require('querystring');
const urlLib = require('url');
const fs = require('fs');

let server = http.createServer((req, res) => {
    //  GET
    const obj = urlLib.parse(req.url, true);
    const url = obj.pathname;
    const getData = obj.query;

    //  POST
    let str = '';

    req.on('data', (data) => { // 接收到一段数据
        str += data;
    });

    req.on('end', () => { // 接收到全部数据
        const postData = querystring.parse(str); // 解析为 json 数据
        console.log(url, getData, postData);
    });


    //  文件
    const fileName = `./www${url}`;
    fs.readFile(fileName, (err, data) => {
        if (err) {
            res.write('404');
        } else {
            res.write(data);
        }
        res.end();
    });

});

server.listen(8080);
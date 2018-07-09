const express = require('express');
const consolidat = require('consolidate');
const fs = require('fs');
const ejs = require('ejs');

let server = express();
server.listen(8080);

server.engine('html', consolidat.ejs);
server.set('view engine', 'ejs');
server.set('views', './template');

server.get('/a', (req, res) => {
    // 查看文件的状态，检验文件是否存在
    fs.stat('./render_caches/1.ejs', (err, data) => {
        if (err) {
            // 文件没找到
            renderAndWrite();
        } else {
            // 文件找到
            console.log(11);
            let rs = fs.createReadStream('./render_caches/1.ejs'); //读取
            rs.pipe(res); // 返回给客户端
            rs.on('error', err => {
                console.log('文件读取失败');
                renderAndWrite();
            });
        }
    });

    // 渲染文件，存储起来
    function renderAndWrite() {
        // ejs 创建一个渲染文件，渲染自己
        ejs.renderFile('./template/1.ejs', {
            arr: [1, 2, 3],
            items: ['item1', 'item2', 'item3']
        }, (err, data) => {
            if (err) {
                console.log('渲染失败');
            } else {
                // 把文件缓存起来
                fs.writeFile('./render_caches/1.ejs', data, err => {
                    res.send(data);
                    res.end();
                });
            }
        });


    }
})
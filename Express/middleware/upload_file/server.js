/* 
文件上传 multer
*/
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const server = express();
server.listen(8080);

let multerObj = multer({
    dest: './upload'
}); // dest: 存放地址

server.use(multerObj.any()); // any 接收任何文件。处理 post 接收的文件

server.use(bodyParser.urlencoded({ // 处理 post 接收到的数据
    extended: false
}));

server.post('/file', (req, res) => {
    console.log(req.files);

    // 保留文件的扩展名
    let i = 0;
    _next();

    function _next() {
        let newName = req.files[i].path + path.extname(req.files[i].originalname);

        fs.rename(req.files[i].path, newName, err => { // 文件重命名
            if (err) {
                console.log(err);
                res.sendStatus(500, 'rename error');
                res.end();
            } else {
                i++;

                if (i >= req.files.length) {
                    console.log('文件上传成功');
                } else {
                    _next();
                }
            }
        });
    }
});
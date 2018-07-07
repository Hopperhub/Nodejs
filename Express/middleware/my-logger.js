/* 实现网站日志
监听：
1. 访问时间
2. 访问方法
3. 访问地址
*/
const fs = require('fs');

module.exports = (req, res, next) => {
    console.log(1122);
    let arr = [];

    // 客户端 ip

    // 时间
    let oDate = new Date();
    oDate.toGMTString(); // 国际日期标准表示法
    // oDate.toUTCString(); // 国际日期标准表示法
    arr.push(`[${oDate}]`);

    // 方法
    arr.push(req.method);

    // 地址
    arr.push(req.url);

    fs.appendFile('./logs/acess.log', arr.join(' ') + '\n', err => {
        if (err) {
            console.log('日志写入失败', err);
        }
        next();
    }); // 追加文件内容方法
}
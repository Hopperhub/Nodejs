const fs = require('fs');

// 读取文件 readFile(文件名，回调函数)
fs.readFile('test.txt', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());   // 计算机的二进制数据转化为字符串
    }
});

// 写文件 writeFile(文件名，内容，回调函数)
fs.writeFile('writeText.txt', 'aaaaaaaaa', (err) => {
    console.log(err);
});
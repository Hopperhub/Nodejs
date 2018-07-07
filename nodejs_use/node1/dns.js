/* 域名解析
dns
domain
punycode
*/
const dns = require('dns');

// 网络操作，异步->callback
dns.lookup('www.baidu.com', (err, data) => {
    if (err) {
        console.log('解析错误', err);
    } else {
        console.log(data);
    }
});

// const ip = '';
// dns.lookupService(); // 反向解析
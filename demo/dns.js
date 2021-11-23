const dns = require('dns');

const domain = 'm.seewoedu.cn';

// 操作系统的域名解析(受 host 改动影响)
dns.lookup(domain, (err, address, family) => {
  console.log('地址: %j 地址族：IPv%s', address, family);
});

// 链接到 DNS 服务器解析域名
dns.resolve(domain, (err, res) => {
  console.log('resolve res:', res);
});
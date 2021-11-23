const http = require('http');

// console.log('method:', http.METHODS);

// console.log('STATUS_CODES:', http.STATUS_CODES);

// console.log('globalAgent:', http.globalAgent);

const server = http.createServer((req, res) => {
  res.setHeader('headername', 'header-123');
  console.log('res header names:', res.getHeaderNames());
  res.write('hello world!');
  res.end();
  console.log('res header sent:', res.headersSent);
});
server.listen(8082, () => {
  process.title = '测试 Node.js';
  console.log('process id:', process.pid);
  console.log('server 端口：', 8082);
});

// console.log('agent:', http.Agent);

// console.log('header names:', server.getH)
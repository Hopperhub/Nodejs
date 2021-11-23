const http = require('http');
const testModule = require('./test_module');
const memory = require('./memory');

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  memory.print();
  global.gc(); // 手动进行垃圾回收。(启动命令需要带上参数：node --expose-gc example.js)
  memory.print();

  // === request ===
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    console.log('request data:', data);
  });

  // === response ===
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.end('你好世界\n')
})

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`)
})

console.log('cache:', require.cache);
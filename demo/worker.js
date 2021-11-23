const http = require('http');

const server = http.createServer((req, res) => {
  console.log('req:', req.url);

  if (req.url === '/log') {
    const fs = require('fs');
    const { Logger } = require('./logger');
    const output = fs.createWriteStream('./stdout.txt');
    const errOutput = fs.createWriteStream('./stderr.txt');
    const logger = new Logger(output, errOutput);
    logger.time('计时器');
    logger.info(req.url);
    logger.warn('warnnig');
    // logger.clear();
    logger.trace('错误信息');
    const obj = {
      name: 'hopper',
      age: 26,
      hobby: {
        sport: ['basketball'],
      },
    }
    logger.dir(obj, { depth: 3 });
    logger.timeEnd('计时器');
  }

  res.writeHead(200, {
    'Content-Type': 'text/plain',
  });
  res.end(`I am worker. Pid: ${process.pid}. PPid: ${process.ppid}`);

  // throw new Error('worker process exception!'); // 测试异常进程退出、重建
});

process.title = 'node-worker';

let master;
process.on('message', (message, sendHandle) => {
  if (message === 'server') {
    master = sendHandle;

    // 主进程的连接监听
    master.on('connection', (socket) => {
      server.emit('connection', socket); // 触发 createServer 的回调
    });
  }
});

// 异常监听
process.on('uncaughtException', (err) => {
  console.log(err);
  process.send({ act: 'suiside' });
});
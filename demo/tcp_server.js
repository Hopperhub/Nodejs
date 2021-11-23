const net = require('net');
const HOST = '127.0.0.1';
const PORT = 3001;
const Transcoder = require('./transcoder');
const transcoder = new Transcoder();

const server = net.createServer();
let overageBuffer = null; // 记录上一次剩余的数据

server.listen(PORT, HOST);

server.on('listening', () => {
  console.log(`服务开启在${HOST}:${PORT}`);
});

server.on('connection', (socket) => {
  socket.on('data', (buffer) => {
    if (overageBuffer) {
      buffer = Buffer.concat([overageBuffer, buffer]);
    }

    let packLength = 0;
    while (packLength = transcoder.getPackageLength(buffer)) {
      const package = buffer.slice(0, packLength);
      buffer = buffer.slice(packLength);

      const res = transcoder.decode(package); // 解码
      console.log('结果: ', res);
      socket.write(transcoder.encode(res.body, res.serialNumber));
    }

    overageBuffer = buffer; // 记录不完整的数据
  });
});

server.on('close', () => {
  console.log('server close');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('地址被使用，重试中...');

    setTimeout(() => {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  } else {
    console.log('服务器异常', err);
  }
});
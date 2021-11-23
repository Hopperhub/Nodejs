const net = require('net');
const Transcoder = require('./transcoder');
const transcoder = new Transcoder();

const client = net.createConnection({
  host: '127.0.0.1',
  port: 3001,
});

client.on('connect', () => {
  // ====== test
  const arr = [
    '1 JavaScript ',
    '2 TypeScript ',
    '3 Python ',
    '4 Java ',
    '5 C ',
    '6 PHP ',
    '7 ASP.NET '
  ]
  setTimeout(function () {
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      client.write(transcoder.encode(arr[i]));
    }
  }, 1000);
});

let overageBuffer = null; // 记录上一次剩余的 buffer 数据
client.on('data', (buffer) => {
  let packageLength = 0;

  while (packageLength = transcoder.getPackageLength(buffer)) {
    const package = buffer.slice(0, packageLength);
    buffer = buffer.slice(packageLength);

    const result = transcoder.decode(package);
    console.log('result:', result);
  }

  overageBuffer = buffer;
});

client.on('error', (err) => {
  console.log('服务器异常', err);
});

client.on('close', (err) => {
  console.log('客户端连接断开', err);
});





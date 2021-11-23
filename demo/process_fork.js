const http = require('http');
const { fork } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.url === '/compute') {
    const compute = fork('./lib/fork/compute.js');
    compute.send('compute');

    compute.on('message', (data) => {
      res.end(`${data}`);
      compute.kill();
    });

    compute.on('close', (code, signal) => {
      res.end('服务器错误');
      console.log(`子进程出错; code: ${code} ; signal: ${signal}`);
      compute.kill();
    });
  } else {
    res.end('ok');
  }
});

server.listen(3001, () => {
  console.log(`port: 3001; pid: ${process.pid}`);
});
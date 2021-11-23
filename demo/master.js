const net = require('net'); // 用于建立 IPC
const { fork } = require('child_process');
const { cpus } = require('os');

// 主服务
const server = net.createServer();
server.listen(3001);

// 创建工作进程
const workers = {};
const createWorker = () => {
  const worker = fork('worker.js');

  // 子进程通信监听
  worker.on('message', (message) => {
    if (message.act === 'suicide') {
      // 子进程自杀信号，重启一个新进程
      createWorker();
    }
  });

  // 子进程退出
  worker.on('exit', (code, signal) => {
    console.log('worker process exited, code: %s signal: %s', code, signal);
    delete workers[worker.pid];
  });

  worker.send('server', server);
  // worker.stdout.pipe(process.stdout);
  workers[worker.pid] = worker;
  console.log('worker process created, pid: %s ppid: %s', worker.pid, process.pid);
};

for (let i = 0; i < cpus().length; i++) {
  createWorker();
}

// 监听到退出消息。先退出子进程再退出主进程
const close = (code) => {
  console.log('进程退出：', code);

  if (code !== 0) {
    for (let pid in workers) {
      console.log('master is exited , kill worker pid:', pid);
      workers[pid].kill('SIGINT');
    }
  }

  process.exit(0);
}

process.once('SIGINT', close.bind(this, 'SIGINT'));
process.once('SIGQUIT', close.bind(this, 'SIGQUIT'));
process.once('SIGTERM', close.bind(this, 'SIGTERM'));
process.once('exit', close.bind(this));

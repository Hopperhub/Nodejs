// 守护进程：https://www.cnblogs.com/itplay/p/11091009.html
// nodejs 编写守护进行：https://juejin.cn/post/6844903444839399438
// 实现的作用：终端关闭，node 进程不退出

const { spawn } = require('child_process');
const path = require('path');

const startDaemon = () => {
  const daemon = spawn('node', ['log.js'], {
    cwd: path.resolve(__dirname, 'daemon'),
    detached: true,
    stdio: 'ignore'
  });
  console.log('守护进程开启。父进程 id : %s , 子进程 id : %s', process.pid, daemon.pid);
  daemon.unref();
}

startDaemon();

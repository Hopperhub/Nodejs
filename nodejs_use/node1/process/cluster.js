const cluster = require('cluster');
const os = require('os');
const process = require('process'); // 保存当前进程的信息

/*
 通过复制自身创建新的进程，分裂：主进程，子进程
 只有主进程才能有 fork
*/
if (cluster.isMaster) { // 判断是否是主进程。主进程负责派生子进程，不干活
    for (let i = 0; i < os.cpus().length; i++) { // 根据cpu的内核数量决定派生子进程的数量
        cluster.fork();
    }
    console.log('主进程');
} else { // 子进程负责干活
    console.log(`工作进程#${process.pid}`); // pid 进程编号
}
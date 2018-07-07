const Event = require('events').EventEmitter;

const ev = new Event();

// 监听
ev.on('hopper', (a, b, c) => {
    console.log('接收了一个事件：', a, b, c);
});

// 触发
let res = ev.emit('hopper', 1, 2, 3); // emit事件的返回。如果有监听该发送事件的，返回true，如果没有则返回false
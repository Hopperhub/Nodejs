// 引入 events 模块
var events = require('events');

// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function () {
    console.log('connected');

    // 触发 response 事件
    eventEmitter.emit('response');
}

// 绑定 connect 事件处理程序
eventEmitter.on('connect', connectHandler);

// 使用匿名函数绑定 response 事件处理程序
eventEmitter.on('response', () => {
    console.log('responsed');
});

// 触发 connect 事件
eventEmitter.emit('connect');

console.log('程序执行完毕');
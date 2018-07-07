/*------- argument --------*/
// var eventEmitter = require('events').EventEmitter;  // 引入 events 模块的 eventEmitter

// var event = new eventEmitter();

// event.on('emitter_test', (arg1) => {
//     console.log('test emitter');
//     console.log('测试参数:',arg1);
// });

// setTimeout(() => {
//     event.emit('emitter_test','参数1');
// }, 1000);

// console.log('程序运行结束');

/*---------- EventEmitter 类的应用 -----------*/
// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// var listener1 = () => {
//     console.log('监听器1 执行');
// }

// var listener2 = () => {
//     console.log('监听器2 执行');
// }

// eventEmitter.on('connect', listener1);
// eventEmitter.on('connect', listener2);

// var connectListeners = events.EventEmitter.listenerCount(eventEmitter, 'connect');
// console.log(connectListeners, '个监听器监听连接事件');

// eventEmitter.emit('connect');

// eventEmitter.removeListener('connect', listener1);
// console.log('监听器1 不再受监听');

// eventEmitter.emit('connect');

// connectListeners = events.EventEmitter.listenerCount(eventEmitter, 'connect');
// console.log(connectListeners, '个监听器监听连接事件');

// console.log('程序执行完毕');

/*------------------ Error ----------------------*/
var events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.emit('error');
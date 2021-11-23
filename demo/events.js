const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const door = new EventEmitter();


door.on('error', function(err) {
  console.error(err);
})
throw new Error('This is a error');
door.emit('error', new Error('This is a error'));
console.log('test');

door.on('slam', () => {
  console.log('listen slam1');
});

door.on('slam', () => {
  console.log('listen slam2');
});

door.once('slam', () => {
  console.log('只调用一次！');
});

door.prependListener('slam', () => {
  console.log('slam 事件优先调用的监听');
});

door.emit('slam');
door.emit('slam');

console.log('eventnames:', door.eventNames());

console.log('max listeners:', door.getMaxListeners());

console.log('listener count:', door.listenerCount('slam'));

console.log('listeners:', door.listeners('slam'));

const fileReadEmitter = new EventEmitter();
const status = {};
const select = (file, cb) => {
  fileReadEmitter.once(file, cb);
  console.log('select bind');

  if (status[file] === undefined) {
    status[file] = 'ready';
  }

  if (status[file] === 'ready') {
    status[file] = 'pending';

    fs.readFile(file, (err, res) => {
      console.log('file:', file);
      fileReadEmitter.emit(file, err, res);
      status[file] = 'ready';

      setTimeout(() => {
        delete status[file];
      }, 1000);
    });
  }
}
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    const url = path.resolve(__dirname, 'assets/data.txt');
    select(url, (err, res) => {
      if (err) {
        console.log('读取失败:', err);
        return;
      }
      console.log('读取成功:', res);
    });
  } else {
    const url = path.resolve(__dirname, 'assets/data2.txt');
    select(url, (err, res) => {
      if (err) {
        console.log('读取失败2:', err);
        return;
      } else {
        console.log('读取成功2:', res);
      }
    });
  }
}
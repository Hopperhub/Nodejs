// Console 的基础版本：http://nodejs.cn/api/console.html

const util = require('util');

/**
 * 初始化 Logger 对象
 * @param {*} stdout 
 * @param {*} stderr 
 */
function Logger(stdout, stderr) {
  // 检查当前对象是否是 Logger 的实例
  if (!(this instanceof Logger)) {
    return new Logger(stdout, stderr);
  }

  // 检查是否是一个可写流实例
  if (!stdout || !(stdout.write instanceof Function)) {
    throw new Error('Logger expects a writable stream instance');
  }

  // 设置默认 stderr
  if (!stderr) {
    stderr = stdout;
  }

  // 设置对象属性的特性
  const props = {
    writable: true,
    enumerable: false,
    configurable: false,
  }

  Object.defineProperty(this, '_stdout', { ...props, value: stdout });
  Object.defineProperty(this, '_stderr', { ...props, value: stderr });
  Object.defineProperty(this, '_times', { ...props, value: new Map() });

  // 将原型方法绑定在 Logger 实例上
  Object.keys(Logger.prototype).forEach(k => {
    this[k] = this[k].bind(this);
  });
}

Logger.prototype.log = function () {
  this._stdout.write(util.format.apply(this, arguments) + '\n');
}
Logger.prototype.info = Logger.prototype.log;

Logger.prototype.warn = function () {
  this._stderr.write(util.format.apply(this, arguments) + '\n');
}
Logger.prototype.error = Logger.prototype.warn;

// 获取调用栈信息
Logger.prototype.trace = function trace(...args) {
  const err = {
    name: 'Trace',
    message: util.format.apply(null, args),
  }

  Error.captureStackTrace(err, trace);
  this.error(err.stack);
}

// 清空控制台消息
Logger.prototype.clear = function () {
  if (this._stdout.isTTY) {
    const { cursorTo, clearScreenDown } = require('readline');
    cursorTo(this._stdout, 0, 0); // 移动光标到 TTY 流指定的位置
    clearScreenDown(this._stdout); // 从光标当前的位置向下清除指定的 TTY
  }
}

// 直接输出某个对象
Logger.prototype.dir = function (object, options) {
  // util.inspect 将对象转成字符串
  const opts = { customInspect: false, ...options };
  this._stdout.write(util.inspect(object, opts) + '\n');
}

// 计时器开始时间
Logger.prototype.time = function (label) {
  this._times.set(label, process.hrtime());
}

// 计时器结束时间
Logger.prototype.timeEnd = function (label) {
  const time = this._times.get(label);
  if (!time) {
    process.emitWarning(`timeEnd error: can not read ${label} time`);
    return;
  }

  const duration = process.hrtime(time);
  const ms = duration[0] * 1000 + duration[1] / 1e6;
  this.log('%s: %sms', label, ms.toFixed(3));
  this._times.delete(label);
}

module.exports = new Logger(process.stdout, process.stderr);
module.exports.Logger = Logger;
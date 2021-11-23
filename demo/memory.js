const format = (bytes) => {
  return `${bytes / 1024 / 1024} M`;
}

const print = () => {
  const memory = process.memoryUsage();
  const data = JSON.stringify({
    rss: format(memory.rss), // RAM(占用的物理内存)，包括代码本身、堆、栈
    heapTotal: format(memory.heapTotal), // 堆中申请的内存
    heapUsed: format(memory.heapUsed), // 堆中当前使用的内存
    external: format(memory.external), // c++ 对象占的内存
  });
  console.log('memoryUsage:', data);
}

module.exports = {
  print: print,
}
const computeMethod = () => {
  let sum = 0;

  console.time('计算耗时');
  for (let i = 0; i < 1e10; i++) {
    sum += 1;
  }
  console.timeEnd('计算耗时');

  return sum;
};

process.on('message', (msg) => {
  console.log(msg, `compute process: ${process.pid}`);

  // if (msg !== 'computed') {
  //   process.send(null);
  // }

  const res = computeMethod();
  process.send(res);
});
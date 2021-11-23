// 优惠券领取实践

// redis 连接
const Redis = require('ioredis');
const redis = new Redis({
  host: '119.45.248.144',
  port: 7307,
  password: 'hellohopper'
});

const fs = require('fs');
const { Console } = require('console');
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
const logger = new Console(output, errorOutput);

const Luck = async () => {
  const count = 10;
  const key = 'luck-count';
  const keyExits = await redis.keys(key);

  if (!keyExits) {
    await redis.setnx(key, 0);
  }

  const result = await redis.incr(key);
  if (result > count) {
    logger.error('failure', result);
    return;
  }
  logger.info('success', result);
}

module.exports = Luck;
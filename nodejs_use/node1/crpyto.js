/* 加密 */

const crpyto = require('crypto');

// md5
let hash = crpyto.createHash('md5');

hash.update('aaa');

console.log(hash.digest('hex'));
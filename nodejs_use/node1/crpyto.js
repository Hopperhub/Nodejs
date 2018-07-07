/* 加密 */

const crypto = require('crypto');

// md5 -> 不可逆
// 重置密码，不能找回密码，改成新密码
let hash = crypto.createHash('md5');

hash.update('aaa');

console.log(hash.digest('hex'));
/* 
  - 类似 seajs
  - 只是 js 引入 js 模块，使用 require ，没有 use
*/
const mod1 = require('mod1');
const mod2 = require('./mod2');

const ntest = require('ntest');

console.log(mod1.a + mod2.b);

const arr = [1, 2, 34];
const total = ntest.sum(arr);
console.log(total);
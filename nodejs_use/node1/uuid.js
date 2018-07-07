const uuid = require('uuid/v4');

let str = uuid();
console.log(str.replace(/\-/g, ''));
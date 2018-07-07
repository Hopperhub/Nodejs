/* 断言 -> 调试 */

const assert = require('assert');

function divider(a, b) {
    // 第一个参数为 false 报错，必须为 true 才成立;第二个参数：提醒信息
    assert(typeof a == 'number' && typeof b == 'number', '除法，两个参数都得为数字');
    assert(b != 0, '分母不能为0');
    return a / b;
}

console.log(divider(12, 5));
// console.log(divider(12, 'aaa'));
// console.log(divider(12, 0));
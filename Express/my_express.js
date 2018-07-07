/* 
原生 express , 实现核心功能
*/

const http = require('http');
const assert = require('assert');
const url = require('url');

module.exports = () => {
    let queue = []; // 队列：储存方法的调用

    let server = http.createServer((req, res) => {
        // 原生没有 next

        let {
            pathname,
            query
        } = url.parse(req.url, true);
        req.query = query; // express 的 query 数据实现

        res.send = (data) => {
            if (!(data instanceof Buffer) && typeof data != 'string') {
                data = JSON.stringify(data);
            }
            res.write(data);
        }

        _run(0);
        // 异步操作，递归
        function _run(n) {
            for (let i = n; i < queue.length; i++) {
                if (queue[i].path == pathname || queue[i].path == '*') {
                    // 查找访问地址
                    queue[i].fn(req, res, () => {
                        // -> next
                        _run(i + 1); // express 的核心
                    });
                    break; // 退出循环
                }
            }
        }

    });

    // get
    server.get = function () {
        assert(arguments.length == 2 || arguments.length == 1, 'arguments error');

        let path, fn;
        if (arguments.length == 2) {
            path = arguments[0]; // 请求地址
            fn = arguments[1]; // 回调函数
        } else if (arguments.length == 1) {
            fn = arguments[0];
            path = '*';
        }
        queue.push({
            path,
            fn
        });
    }

    return server;
}
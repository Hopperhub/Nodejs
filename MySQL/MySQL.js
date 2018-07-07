const http = require('http');
const mysql = require('mysql');

const port = 8080;

/* // 创建数据库连接
const dbConnection = mysql.createConnection({
    host: 'localhost', // 主机
    user: 'root', // 用户
    password: '123456', // 密码
    database: '20180616' // 数据库
});

// 连接
dbConnection.connect((err, data) => {
    if (err) {
        console.log('连接失败', err);
    }
}); */

// 使用连接池的方式，避免多个请求造成的等待
const dbConnection = mysql.createPool({
    connectionLimit: 10, // 连接限制，默认值为 10 
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: '20180616'
});

// 连接
dbConnection.getConnection((err, connection) => {
    if (err) {
        console.log('连接失败', err);
    } else {
        console.log('连接成功');
        // 执行数据库语句
        connection.query('SELECT username FROM user_table WHERE ID=1', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(JSON.stringify(data));
            }
        });
    }
});

const server = http.createServer((req, res) => {});

server.listen(port);
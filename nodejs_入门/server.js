const http = require('http');
const url = require('url');
// const fs = require('fs');

// fs.readFile('test.txt', (err, data) => {
// 	console.log(err);
// 	console.log(data); // Buffer（数据类型）: 缓冲区，二进制的数组，使数据保持二进制的状态，可以兼容文字、图片、视频... 
// })
// fs.writeFile('test1.txt', '写入的数据', err => {
// 	console.log(err);
// })

const server = http.createServer((req, response) => {
	const query = url.parse(req.url).query;
	if (query === 'a=1') {
		process.kill(process.pid, 'SIGTERM');
	}

	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.write('123'); // 发送响应数据
	response.end();
}).listen(3000);

process.on('SIGTERM', () => {
	server.close(() => {
		console.log('进程已终止');
	});
});

console.log('服务器已就绪');

const args = require('minimist')(process.argv.slice(2));
console.log('running 参数:', args);
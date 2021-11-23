const http = require('http');
const fs = require('fs');
const Stream = require('stream');

const readableStream = new Stream.Readable({
  read() {
    console.log('stream read!');
  }
});
readableStream.push('hi');
readableStream.push('pipe');
console.log('readableStream read:', readableStream.pipe());

const server = http.createServer((req, res) => {
  // fs.readFile(`${__dirname}/assets/data.txt`, (err, data) => {
  //   if (err) {
  //     res.end(404);
  //   }

  //   res.end(data);
  // })

  const stream = fs.createReadStream(`${__dirname}/assets/data.txt`);
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
  stream.pipe(res);
});

server.listen(3001);
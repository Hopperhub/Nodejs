const cluster = require('cluster');
const http = require('http');
if (cluster.isMaster) {
  const worker = cluster.fork();
  [
    'error',
    'exit',
    'listening',
    'message',
    'online'
  ].forEach(workerEvent => {
    worker.on(workerEvent, msg => {
      console.log(`[${workerEvent}] from worker:, ${msg}`);
    });
  });
} else {
  http.createServer(function (req, res) {
    // process.send(${ req.url });
    res.end(`Hello World: ${ req.url }`);
  }).listen(8000);
}
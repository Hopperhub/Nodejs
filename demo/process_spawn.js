const { spawn } = require('child_process');
const path = require('path');

const child = spawn('ls', ['-l'], { cwd: path.resolve(__dirname, 'assets') });
child.stdout.pipe(process.stdout);
console.log(process.pid, child.pid);
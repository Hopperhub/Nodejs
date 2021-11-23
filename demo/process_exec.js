const { exec, execFile } = require('child_process');

exec('node -v', (err, stdout, stderr) => {
  console.log(err, stdout, stderr);
});

execFile('node', ['-v'], (err, stdout, stderr) => {
  console.log(err, stdout, stderr);
});
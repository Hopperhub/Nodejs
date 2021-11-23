const fs = require('fs');
const path = require('path');

// === 文件属性 ===
const pathStr = '/Users/user/Desktop/test.sh';
fs.stat(pathStr, (err, stats) => {
  if (err) {
    console.log('读取失败：', err);
    return;
  }

  console.log('文件信息：', stats);
  console.log('是否是文件：', stats.isFile());
  console.log('是否是目录：', stats.isDirectory());
  console.log('是否是符号链接：', stats.isSymbolicLink());
  console.log('文件大小：', stats.size);
});

// === 文件路径 ===
console.log('相对路径的绝对路径计算：', path.resolve('test.sh'));

// === 文件读取 ===
fs.readFile(pathStr, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('文件读取结果：', res);
});

// === 写入文件 ===
fs.writeFile(pathStr, '增加一些内容', { flag: 'a+' }, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('文件写入成功：', res);
});

fs.appendFile(pathStr, '在文件末尾增加内容', (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('写入文件成功：', res);
});

// === 文件夹操作 ===
const folderPath = '/Users/user/Desktop/iframe-test';
fs.access(folderPath, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('文件夹是否存在且可访问：', res);
});

const folderPath2 = '/Users/user/Desktop/node-file-test';
try {
  if (!fs.existsSync(folderPath2)) {
    fs.mkdirSync(folderPath2);
  }
} catch (err) {
  console.error(err);
}

const folderPath3 = '/Users/user/Desktop';
const isFile = (fileName) => fs.lstatSync(fileName).isFile();
try {
  const folderFileRes = fs.readdirSync(folderPath3);
  const completePaths = folderFileRes.map(item => path.join(folderPath3, item));
  const fileList = completePaths.filter(isFile);
  console.log('fileList:', fileList);
} catch (err) {
  console.error(err);
}

const folderPath4 = '/Users/user/Desktop/node-file-test2';
fs.rename(folderPath2, folderPath4, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('rename res:', res);
})

const fse = require('fs-extra');
fse.remove(folderPath4)
  .then((res) => {
    console.log('删除结果：', res);
  })
  .catch((err) => {
    console.log('删除失败！', err);
  });
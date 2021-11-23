const axios = require('axios');

axios.post('http://127.0.0.1:3000/todo', { todo: 'do something' })
  .then(res => {
    console.log('请求成功', res);
  })
  .catch(err => {
    console.log('请求失败：', err);
  })
  
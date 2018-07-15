/* 
服务端渲染
ejs: 非侵入->现成的HTML文件里直接加（不破坏原有的HTML）
优点：保持HTML的结构
缺点：复杂
pug: 侵入->自己的代码
缺点：HTML完全彻底不复存在
优点：简单

express 渲染引擎适配 -> consolidate
*/

const express = require('express');
const consolidate = require('consolidate'); // 适配器

let server = express();
server.listen(8080);

// 1.选择一种模板引擎
server.engine('html', consolidate.ejs);

// 2.指定模板文件的扩展名
server.set('view engine', 'ejs');

// 3.指定模板文件的路径
server.set('views', './template');

server.get('/', (req, res) => {
    res.render('1', {
        arr: [1, 2, 3],
        items: ['item1', 'item2', 'item3']
    }); // 渲染模板并且输出
});

/* 
模板语法
<% %>
<%= 输出 -> 转义输出（html标签转义成html实体）
<%- 不转义输出（html标签->原样）
-%> 不换行
*/

/* 
node 静态化
1. 查找有没有以前渲染留下的结果（文件、redis、数据库...）
有->返回
没有->渲染->保存
*/
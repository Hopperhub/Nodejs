/* 路由 */

const express = require('express');

let server = express();
server.listen(8080);

let router_user = express.Router(); //创建 user router
server.use('/user', router_user); // 给路由分配地址，凡是 /user 的请求都归 router_user
router_user.get('/', (req, res) => { // router_user 作为一个小服务器，是整个服务器的一部分，此时 / 不代表整个网站的根，而是 /user 的根
    res.send('abc');
    res.end();
});
router_user.get('/login', (req, res) => { // /user/login/
    res.send('登录');
    res.end();
});

let router_arcticle = express.Router(); //创建 arcticle router
server.use('/article', router_arcticle);
router_arcticle.get('/', (req, res) => {
    res.send('文章的根目录');
    res.end();
});

// 路由的下一级还可以加路由。user 路由下加一个 vip 路由
let router_vip = express.Router();
router_user.use('/vip', router_vip);
router_vip.get('/', (req, res) => {
    res.send('vip 用户');
    res.end();
})
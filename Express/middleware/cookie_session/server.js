/* 
cookie、session:
1. cookie: 浏览器存数据，在请求服务器的时候，会被带到请求里面。服务器和浏览器都可以设置
    缺点：容量有限（4k）、不安全（浏览器随意篡改）
2. session: 只存在服务器端
    优点：容量不限，安全（用户根本碰不到）
session 基于 cookie

浏览器和服务器交互：
1. 浏览器第一次请求服务器，cookie 为空
2. 服务器给浏览器响应一个 cookie -> session_id(uuid)
3. 浏览器下次访问服务器的时候，会把 cookie 带过去

* 服务器：第一次没有 session ，就生成一个新的 session ， 后面的工作都是在读取 session
风险：如果 session_id 泄露了 -> session 劫持
解决：
1. 提醒用户不要在F12的console里面乱输入
2. * session_id 做得足够复杂、session_id 定期更换
*/

/* 
中间件：cookie-parser、cookie-session

cookie
1. 设置 res.cookie(name,value,options)
2. 读取 req.cookies -> cookie-parser
*3. 安全（防篡改）

为啥不自动签名所有的 cookie?
1. 不是所有的 cookie 都敏感
2. 签名会导致 cookie 的体积扩大很多

session -> 不能独立存在，基于 cookie
1. 设置 req.session['cash']=xxx
2. 读取 req.session
*3. 安全（防篡改）
session session_id
session.sig session_id的签名
*/

const express = require('express');
const cookieParser = require('cookie-parser');

let server = express();
server.listen(8080);

server.use(cookieParser('ajijfidsajifajiadij')); // 安全密钥，定义在服务器

server.get('/', (req, res) => {
    console.log(req.cookies); // 普通 cookie
    console.log(req.signedCookies); // 安全/签名 cookie

    // 设置cookie。name,value,option
    res.cookie('pass', '123', {
        // domain
        // expires:date
        // maxAge:int
        // path
        // secure:true  只用https
        signed: true
    }); // 经过签名，就可以防止用户篡改
    res.end();
});
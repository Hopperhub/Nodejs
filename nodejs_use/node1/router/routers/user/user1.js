const router = require('../../../../libs/router'); // 和主程序之间的关联只剩一个 router -> EventEmitter

// 定义该模块的接口
// 登录
router.on('/login', (req, res) => {
    const {
        username,
        password
    } = req.query;
    res.send({
        username,
        password
    });
    res.end();
});
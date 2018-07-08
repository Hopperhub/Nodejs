const express = require('express');

let router_user = express.Router();

router_user.use('/vip', require('./vip'));

router_user.get('/', (req, res) => {
    res.send('用户');
    res.end();
});

module.exports = router_user;
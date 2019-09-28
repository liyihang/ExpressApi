let express = require('express');
let request = require('request');
let common = require('../common/common.json');
let router = express.Router();

// 获取小说源
router.get('/', function (req, res, next) {
    if (!req.query.id) {
        res.json({ code: 401, msg: '传入参数错误……' })
    }
    let id = encodeURI(req.query.id);
    request.get(`${common.API}/atoc?view=summary&bood=${id}`, function (err, response, body) {
        if (err) {
            res.json({ code: 402, msg: '查询失败' });
        }
        // 解析数据
        body = JSON.parse(body);
        if (body.length == 0) {
            res.json({ code: 404, msg: '没有相关信息' })
        }
        // 第一个源是正版源，是收费加密的，所以默认选中第二个源
        let n = parseInt(req.query.n);
        if (isNaN(n) || n == 0) {
            n = 1;
        }
        // n 不能大于数据源的长度
        if (n > body.length) {
            res.json({ code: 1002, msg: '参数错误' });
        } else {

        }
    });
});
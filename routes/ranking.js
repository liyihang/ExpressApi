let express = require('express')
let request = require('request')
let common = require('../common/common.json')
let router = express.Router();


router.get('/', function (req, res, next) {
    request.get(`${common.API}/ranking/gender`, function (err, response, body) {
        if (err) {
            res.json({ code: 400, msg: '请求出错……' });
        }
        body = JSON.parse(body);
        if (body.ok) {
            let ranking = {
                male: body.male,
                picture: body.picture,
                epub: body.epub,
                female: body.female
            };
            res.json({code:200,ranking:ranking,msg:'ok'});
        } else {
            res.json({ code: 400, msg: '请求出错……' });
        }
    });
});

router.get('/:id', function (req, res, next) {
    if (req.param.id) {
        let id = encodeURIComponent(req.param.id);
        request.get(`${common.API}/ranking/${id}`, function (err, response, body) {
            if (err) {
                res.json({ code: 400, msg: '请求错误' })
            };
            body = JSON.parse(body);
            if (body.ok) {
                res.json({ code: 200, ranking: body.ranking, msg: 'success' });
            } else {
                res.json({ code: 404, msg: '未查询到，请检查查询编号^' });
            }

        });
    }

});
module.exports = router;
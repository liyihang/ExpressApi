var express = require('express');
let request = require('request')
let common = require('../common/common.json')
var router = express.Router();

/**
 * 模糊查询接口
 * http://api.zhuishushenqi.com/book/fuzzy-search?query={name}
 */
router.get('/', function (req, res, next) {
  // 查询参数
  // console.log(req.query)
  if (req.query.query) {
    let query = encodeURIComponent(req.query.query);
    request.get(`${common.API}/book/fuzzy-search?query=${query}`, function (err, response, body) {
      if (err) {
        res.json(
          {
            code: 400,
            msg: '请求出错！请检查参数……'
          }
        );
      }
      body = JSON.parse(body);
      if (body.ok) {
        if (body.books.length === 0) {
          res.json({
            code: 404,
            msg: '未查询到数据，请尝试其他关键字……'
          });
        }
        let books = body.books.slice(0, 49);
        books.forEach(element => {
          element.cover = common.PIC + element.cover;
        });
        res.json({ 'code': 200, 'books': books, 'msg': 'ok' });
      } else {
        res.json({
          code: 500,
          msg: '请求出错！……'
        });
      }
    });
  } else {
    res.json({ 'code': 403, 'msg': '参数错误!' });
  }
});

module.exports = router;

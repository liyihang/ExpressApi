var express = require('express');
let request = require('request')
var router = express.Router();
let common = require('../common/common.json')

/* 首页数据 追书热榜 top 20
* 
 */
router.get('/', function (req, res, next) {
  request.get(`${common.API}/ranking/548e97e29fb698a01dc6ee6f`, function (err, response, body) {
    if (err) {
      res.json({
        code: 400,
        msg: 'load data failed'
      })
    }
    body = JSON.parse(body);
    if(body.ok){
      let books = body.ranking.books.slice(0,19);
      books.forEach(element => {
        element.cover = common.API+element.cover;
      });
      res.json({
        code:200,
        books:books,
        msg:'ok'
      })
    }else{
      res.json({
        code: 401,
        msg: 'Token unvaliable'
      })
    }
  });
});

module.exports = router;

var express = require('express');
let request = require('request')
var router = express.Router();
let common = require('../common/common.json')

/* 首页数据 追书热榜 top 20
* 
 */
router.get('/', function(req, res, next) {
  
  res.send(JSON.stringify({'code':2012301,'msg':'success123'}));
});

module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
const mysql = require('./config.js');

router.post('/login', function(req, res) {
         var authorName = req.body.authorName;
         var password = req.body.password;
         var params = req.body;
         var hash = crypto.createHash('md5');
         hash.update(password);
         password = hash.digest('hex');
         var query = 'SELECT * FROM author WHERE authorName=' + mysql.escape(authorName) + ' AND authorPassword=' + mysql.escape(password);
         mysql.query(query, function(err, rows, field) {
             var user = rows[0];
             if(!user) {
               return res.send({
                 msg: "登录失败"
               })
             }else {
      let content = {
        name: params.authorName
      }
      let secretOrPrivateKey = "_jwt"; // 这是加密的key（密钥）
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 1 // 1小时过期
      });
      return res.send({
        status: 1,
        msg: "登录成功",
        name: params.authorName,
        token: token
      })
    }
  })
});

router.get('/article', function(req, res){
  var sql = 'select *from article order by articleID desc';
  mysql.query(sql,[],function(err, result) {
    var data = JSON.parse(JSON.stringify(result));
    return res.send({
      msg: "查询成功",
      list: data
    })
  })
});

router.post('/delete', function(req, res){
  var sql = 'DELETE FROM article WHERE articleID=?';
  mysql.query(sql,[req.body.id],function(err, result){
    return res.send({
      msg: "删除成功"
    })
  })
});

router.post('/postessay', function(req, res) {
  var title = req.body.title;
  var content = req.body.content;
  var author = req.body.authorName;
  var sql =  'INSERT article SET articleTitle=' + mysql.escape(title) + ',articleAuthor='
  + mysql.escape(author) + ',articleContent=' + mysql.escape(content) + ',articleTime=CURDATE()';
  mysql.query(sql,function(err, result){
    return res.send({
      msg: "提交成功"
    })
  })
});

router.post('/changeessay', function(req, res){
  var content = req.body.content;
  var title = req.body.title;
  var articleID = req.body.articleID;
  var sql = 'update article set articleTitle='+ mysql.escape(title) + ',articleContent ='
  + mysql.escape(content) + 'where articleID='+ mysql.escape(articleID);
  mysql.query(sql,function(err, result) {
    return res.send({
      msg: "修改成功"
    })
  })
});

router.post('/dataclick', function(req, res){
  var articleID = req.body.essayid;
  var sql = 'update article set articleClick=articleClick+1 where articleID='
  +mysql.escape(articleID);
  mysql.query(sql, function(err, result){
    if(err){
      console.log(err);
      return;
    }
  })
})

module.exports = router;

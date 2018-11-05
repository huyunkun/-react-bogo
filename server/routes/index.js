var express = require('express');
var router = express.Router();
var Register = require('../controllers/Register');
var Bogos = require('../controllers/Bogos');
const bodyParser = require('body-parser')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//注册
router.post('/register', Register.register);
//验证码
router.post('/vcode', Register.vcode);
//登录
router.post('/login', Register.login);
//所有bogo
router.get('/allbogo', Bogos.allbogo);
//获取个人bogo
router.get('/personalBogo', Bogos.personalBogo);
//新建个人bogo
router.post('/createBogo', Bogos.createBogo);
//详情
router.get('/details', Bogos.details);
//评论保存
router.post('/commentSave', Bogos.commentSave);

module.exports = router;

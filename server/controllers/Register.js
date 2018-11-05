const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('node-uuid');

const User = require('../Schema/schemaUser.js');
const myUser = mongoose.model('myUser',User);

//注册
exports.register = function(req, res) {
    let name = req.body.name; //名称
    let passWord = req.body.passWord; //密码
    let vcode = req.body.vcode; //验证码
    if (name !== ''&&passWord !== ''&&vcode !== '') {
        let fR = vcodeF(req.body);
        if (fR.success) {
            myUser.find({'userName': name})
            .then(findData => { //查找数据库中是否已经存在该用户名
                let md5 = crypto.createHash('md5');
                md5.update(passWord); //md5加密
                let savePasswaor = md5.digest('hex');
                
                if (findData.length === 0) { //不存在该用户
                    let userData = new myUser({
                        userName: name,
                        passWord: savePasswaor,
                        uuId: uuid.v1()
                    });
                    userData.save()//保存用户名，注册成功
                    .then(successData => {
                        console.log(successData);
                        res.json({
                            code: 10000,
                            msg: 'success',
                            success: true
                        });
                    })
                    .catch((e) =>{
                        console.log(e);
                        res.json(e);
                    })
                } else {
                    res.json({
                        code: 10001,
                        msg: '用户已存在',
                        success: false
                    });
                }
            })
            .catch((e) => {
                console.log(e);
                res.json(e);
            });
        } else {
            res.json(fR);
        }
    } else {
        res.json({
            code: 1002,
            msg: '请填写名称及密码',
            success: false
        });
    }
}

function vcodeF(data) {
    let sureVcode = data.vcodeData; //正确的验证码
    let vcodeValue = data.vcode; //用户输入的验证码
    let allVcode = []; //存放部分大小写的验证码
    let dataArr = vcodeValue.split('');
    let sendData = []; //用户输入的验证码转为数字
    dataArr.map((item, index) => { //用户输入的验证码转为数字
        item = Number(item.charCodeAt());
        item = item > 64 && item < 91 ? item - 7 : ( item < 64 ? item : item - 13 );
        sendData.push(item);
    });
    sureVcode.map((item, index) => {
        if (Number(item) >= 58 && Number(item) <= 83) { //大写字母
            allVcode[index] = [Number(item), Number(item) + 26];
        } else if (Number(item) >= 84 && Number(item) <= 109) { //小写字母
            allVcode[index] = [Number(item), Number(item) - 26];
        } else {
            allVcode[index] = [Number(item), Number(item)];
        }
    });
    console.log(allVcode);
    console.log(sendData);
    let one = (sendData[0] === allVcode[0][0] || sendData[0] === allVcode[0][1]);
    let two = (sendData[1] === allVcode[1][0] || sendData[1] === allVcode[1][1]);
    let three = (sendData[2] === allVcode[2][0] || sendData[2] === allVcode[2][1]);
    let four = (sendData[3] === allVcode[3][0] || sendData[3] === allVcode[3][1]);
    if (one&&two&&three&&four) { //验证码正确
        return {
            code: 10000,
            msg: 'success',
            success: true
        }
    } else {
        return { //验证码错误
            code: 10001,
            msg: '验证码错误',
            success: false
        }
    }
}

//验证码
exports.vcode = function(req, res) {
    if (!req.body.send) { //进入注册页面返回验证码
        let vcode = initState();
        res.json({
            code: 10000,
            msg: 'success',
            success: true,
            data: {
                vcode
            }
        });
    }
}

function initState(){ //初始化验证码
    return {
      data: getRandom(109,48,4),
      rotate: getRandom(75,-75,4),
      fz: getRandom(8,20,4),
      color: [getRandom(100,255,3), getRandom(100,255,4), getRandom(100,255,3), getRandom(100,255,3)]
    }
  }

function getRandom(max, min, num) { //生成验证码
    const asciiNum = ~~(Math.random()*(max-min+1)+min)
    if(!Boolean(num)){
      return asciiNum
    }
    const arr = []
    for(let i = 0; i < num; i++){
      arr.push(getRandom(max, min))
    }
    return arr
  }

  //登录
exports.login = function(req, res) {
    let userName = req.body.userName;
    let passWord = req.body.passWord;
    if (userName !== ''&&passWord !== '') {
        let nowPassWord = crypto.createHash('md5').update(passWord, 'utf8').digest("hex");
        myUser.find({'userName': userName})
        .then(findData => {
            console.log(findData[0].userName, userName);
            if (findData[0].userName === userName) { //用户存在
                if(nowPassWord === findData[0].passWord) {
                    res.cookie('uuId',findData[0].uuId);
                    res.json({
                        code: 10000,
                        success: true,
                        msg: '登录成功'
                    });
                } else {
                    res.json({
                        code: 10002,
                        success: false,
                        msg: '密码错误'
                    });
                }
            } else {
                res.json({
                    code: 10001,
                    success: false,
                    msg: '用户名错误'
                });
            }
        })
        .catch(e => {
            console.log(e);
            res.json({
                code: 1001,
                msg: '用户不存在',
                success: false
            })
        });
    } else {
        res.json({
            code: 1003,
            msg: '请填写用户名密码',
            success: false
        })
    }
}
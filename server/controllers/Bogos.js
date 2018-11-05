const mongoose = require('mongoose');
const AllBogo = require('../Schema/schemaAllBogo.js');
const myAllBogo = mongoose.model('myAllBogo',AllBogo);

exports.allbogo = function(req, res) {
    myAllBogo.find()
    .then(findData => {
        if (findData.length === 0) {
            res.json({
                code: 10002,
                msg: '暂无bogo',
                success: false
            });
        } else {
            res.json({
                code: 10000,
                msg: 'success',
                data: findData,
                success: true
            });
        }
    })
    .catch(e => {
        res.json({
            code: 10001,
            msg: '查找数据库失败',
            success: false
        });
    });
}

exports.personalBogo = function(req, res) {
    myAllBogo.find({"writeName": req.query.userName, "uuId": req.cookies.uuId})
    .then(findData => {
        if (findData.length === 0) {
            res.json({
                code: 10002,
                msg: '暂无bogo',
                success: false
            });
        } else {
            res.json({
                code: 10000,
                msg: 'success',
                data: findData,
                success: true
            });
        }
    })
    .catch(e => {
        res.json({
            code: 10001,
            msg: '查找数据库失败',
            success: false
        });
    });
};

exports.createBogo = function(req, res) {
    var id = String(Date.parse(new Date())) + String(Math.floor(Math.random()*10));
    let myallbogo = new myAllBogo({
        id: id,
        writeName: req.body.userName, //作者的名字
        uuId: req.cookies.uuId,
        title: req.body.title, //bogo标题
        content: req.body.content, //bogo内容
        reply: []
    });
    myallbogo.save()
    .then(() => {
        res.json({
            code: 10000,
            success: true,
            msg: '新建成功'
        });
    })
    .catch(e => {
        res.json({
            code: 10001,
            success: false,
            msg: '保存失败'
        });
    });
};

exports.details = function(req, res) {
    let id = req.query.id;
    myAllBogo.find({id:id})
    .then(findData => {
        if (findData.length !== 0) {
            res.json({
                code: 10000,
                success: true,
                data: findData[0],
                msg: 'success'
            });
        } else {
            res.json({
                code: 10001,
                success: false,
                msg: '没有找到该bogo详情'
            });
        }
    })
    .catch(e => {
        res.json({
            code: 9999,
            success: false,
            msg: '查找数据库失败'
        });
    });
}

exports.commentSave = function(req, res) {
    console.log(req.body);
    let data = req.body;

    myAllBogo.update({id: data.id}, {$push:{reply: data}})
    .then((up) => {
        if (up.ok === 1) {
            res.json({
                code: 10000,
                success: true,
                msg: '评论成功'
            });
        }
    })
    .catch(e => {
        res.json({
            code: 10001,
            success: false,
            msg: '数据库操作失败'
        })
    });
}
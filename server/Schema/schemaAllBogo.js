const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let AllBogo = new Schema({
    id: String,
    writeName: String, //作者的名字
    uuId: String,
    title: String, //bogo标题
    content: String, //bogo内容
    Date: Date, //发表bogo的时间
    reply: [{
        id: String,
        replier: String, //回复的人
        byReplier: String, //被回复的人
        byContentTitle: String, //被回复的内容的标题
        content: String, //回复的内容
        replyTime: Date //回复时间
    }]
}
,{ timestamps: true });

module.exports = AllBogo;
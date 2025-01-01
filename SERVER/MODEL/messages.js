const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId:String,
    senderId:String,
    message:String
},{timestamps:true});

exports.messages =mongoose.model('messages',messageSchema)
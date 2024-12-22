const Mongoose = require('mongoose');

const userRegister = new Mongoose.Schema({
    username :{type : String,required:true,minlength:3,maxlength:30},
    email:{type:String,required:true,minlength:3,maxlength:50,unique :true},
    password:{type:String,required:true,minlength:3,maxlength:50,}
},{
    timestamps:true
})

exports.UserRegisterModel = Mongoose.model('user',userRegister);
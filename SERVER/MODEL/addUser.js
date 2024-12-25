const Mongoose = require('mongoose');

const userRegister = new Mongoose.Schema(  {
    members: {
      type: [String], // Define members as an array of strings for clarity
      required: true,
    },
  },{
    timestamps:true
})

exports.addedUsers = Mongoose.model('addedusers',userRegister);
const mongoose = require('mongoose');

const userModel = mongoose.model('newNode',new mongoose.Schema({

            Name:{type:String},
            lastName:{type:String},
            email:{type:String},
            password:{type:String},
            gender:{type:String},
            city:{type:String},
            country:{type:String},
            profilePic:{type:String},
            isVerified:{type:Boolean, default:false}
},
{
            timestamps:true
}) )

module.exports = { userModel }
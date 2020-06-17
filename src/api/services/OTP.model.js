const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        index:true
    },
    OTP:{
        type:String,
        required:true,
        index:true
    },
    type:{
        type:String,
        required:true,
        index:true
    },
    isValid:{
        type:Boolean
    }
})

const OTPModel = mongoose.model('OTPModel',OTPSchema);

module.exports = OTPModel;
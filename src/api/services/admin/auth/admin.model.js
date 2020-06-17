const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String
    },
    isActive:{
        type:Boolean
    }
});

const adminModel = mongoose.model('AdminModel',adminSchema);

module.exports = adminModel;
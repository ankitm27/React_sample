const mongoose = require('mongoose');

const dataTypesSchema = new mongoose.Schema({
    typeName:{
        type:String,
        required:true,
        index:true
    },
    isPresent:{
        type:Boolean
    }
    

});

const dataTypesModel = mongoose.model('DataTypesModel',dataTypesSchema)

module.exports = dataTypesModel;

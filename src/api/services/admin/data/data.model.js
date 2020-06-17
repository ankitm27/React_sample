const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    reportId:{
        type:String,
        required:true,
        index:true
    },
    sectionId:{
        type:String,
        required:true,
        index:true
    },
    dataType:{
        type:String,
        required:true    
    },
    data:{
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        dataObj:{
            type:String
        }
    },
    subDataType:{
        type:String
    },
    chapterId:{
        type:String
    },
    sectionSequence:{
        type:Number
    },
    chapterSequence:{
        type:Number
    }
})

const dataModel = mongoose.model('DataModel',dataSchema);

module.exports = dataModel;
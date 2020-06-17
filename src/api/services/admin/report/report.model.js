const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reportName:{
        type:String,
        required:true,
        index:true
    },
    chapters:[{
        chapterName:{
            type:String
        },
        isActive:{
            type:Boolean
        },
        type:{
            type:String
        }
    }],
    sections:[{
        chapterId:{
            type:String
        },
        sectionName:{
            type:String
        },
        isActive:{
            type:Boolean
        },
        type:{
            type:String
        }
    }]
})

const ReportModel = mongoose.model('ReportModel',reportSchema);

module.exports = ReportModel;
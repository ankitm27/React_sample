const joi = require('joi');

const data = {
    addNewReport:{
        body:{
            name:joi.string().required()
        }
    },
    addNewChapter:{
        body:{
            reportId:joi.string().required(),
            chapterName:joi.string().required(),
            chapterType:joi.string().required()
        }
    },
    updateChapterName:{
        body:{
            reportId:joi.string().required(),
            newChapterName:joi.string().required(),
            chapterId:joi.string().required()
        }
    },
    deleteChapter:{
        body:{
            reportId:joi.string().required(),
            chapterId:joi.string().required()
        }
    },
    addSection:{
        body:{
            reportId:joi.string().required(),
            chapterId:joi.string().required(),
            sectionName:joi.string().required(),
            sectionType:joi.string().required()
        }
    },
    updateSectionName:{
        body:{
            reportId:joi.string().required(),
            newSectionName:joi.string().required(),
            sectionId:joi.string().required()
        }
    },
    detail:{
        query:{
            reportId:joi.string().required()
        }
    },
    sectionDelete:{
        body:{
            reportId:joi.string().required(),
            sectionId:joi.string().required()
        }
    }

}

module.exports = data;
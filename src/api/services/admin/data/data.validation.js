const baseJoi = require('joi');
const imageJoiExtension = require('joi-image-extension');

const joi = baseJoi.extend(imageJoiExtension);


const data = {
    addData:{
        body:{
            reportId:joi.string().required(),
            sectionId:joi.string().required(),
            dataType:joi.string().required(),
            data:joi.object().required(),
            chapterId:joi.string().required()
        }
    },
    imageUpload:{
        file:{
            image:joi.image().required()
        }
    },
    viewSection:{
        query:{
            sectionId:joi.string().required()
        }
    }
}

module.exports = data;
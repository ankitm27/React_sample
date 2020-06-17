const mongoose = require('mongoose')
const reportModel = require('./report.model.js');

const data = {
  getReportList: async () => {
    try {
      const data = await reportModel.find({}, {
        _id: 1,
        reportName: 1
      });
      return {
        success: true,
        data: {list:data}
      };
    } catch (err) {
      console.log("There is some problem,Please try after some time", err);
      return {
        success: false,
        msg: err
      };
    }
  },
  addNewReport: async (reportName) => {
    try {
      const reportData = new reportModel({
        reportName: reportName,
        isActive: true
      });
      await reportData.save();
      return {
        success: true
      };
    } catch (err) {
      console.log("There is some problem, Please try after some time");
      return err;
    }
  },
  addNewChapter: async (reportId, chapterName,chapterType) => {
    try {
      const chapterAdded = await reportModel.findOneAndUpdate({
        _id: reportId
      }, {
        $push: {
          chapters: {
            chapterName: chapterName,
            isActive: true,
            type:chapterType
          }
        }
      }, {
        new: true
      })
      return {
        success: true
      };
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return err;
    }
  },
  updateChapterName: async (reportId, newChapterName, chapterId) => {
    try {
      const chapterNameUpdated = await reportModel.updateOne({
        _id: reportId,
        "chapters._id": chapterId
      }, {
        $set: {
          "chapters.$.chapterName": newChapterName
        }
      })
      return {
        success: true
      }
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return err;
    }
  },
  deleteChapter: async (reportId, chapterId) => {
    try {
      const deleteChapter = await reportModel.updateOne({
        _id: reportId,
        "chapters._id": chapterId
      }, {
        $set: {
          "chapters.$.isActive": false
        }
      })
      return {
        success: true
      }
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return err;
    }
  },
  addSection: async (reportId, chapterId, sectionName,sectionType) => {
    try {
      const addSection = await reportModel.updateOne({
        _id: reportId,
      }, {
        $push: {
          "sections": {
            sectionName: sectionName,
            isActive: true,
            chapterId: chapterId,
            type:sectionType
          }
        }
      })
      return {
        success: true
      }
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return {
        success: false,
        msg: "There is some problem, Please try after some time"
      }
    }
  },
  updateSectionName: async (reportId, sectionName, sectionId) => {
    try {
      console.log("section id", sectionId);
      const updateChapterName = await reportModel.findOneAndUpdate({
        "_id": reportId,
        "sections._id": sectionId
      }, {
        "$set": {
          "sections.$.sectionName": sectionName
        }
      })
      console.log("update chapter name", updateChapterName);
      return {
        success: true
      }
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return {
        success: false,
        msg: "There is some problem, Please try after some time"
      }
    }
  },
  detail: async (reportId) => {
    try {
      const detail = await reportModel.findOne({
        _id: reportId,
        // "chapters.isActive": true,
        // "sections.isActive": true
      }, {
        reportName: 1,
        "chapters.chapterName": 1,
        "sections.sectionName": 1,
        "sections.chapterId":1,  
        "chapters._id":1,
        "sections._id":1
    })
      return {
        success: true,
        data: {
          detail: detail
        }
      }
    } catch (err) {
      console.log("There is some error, Please try after some time", err);
      return {
        success: false
      }
    }
  },
  sectionDelete: async (reportId, sectionId) => {
    try {
      const sectionDelete = await reportModel.findOneAndUpdate({
        _id: reportId,
        "sections._id": sectionId
      }, {
        "sections.$.isActive": false
      })
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return {
        success: false,
        msg: "There is some problem,Please try after some time"
      }
    }
  }


}

module.exports = data;

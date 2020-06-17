const service = require('./report.services.js');
const data = {
  getReportList: async (req, res) => {
    try {
      const data = await service.getReportList();
      return res.send(data);
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return res.send(err);
    }
  },
  addNewReport: async (req, res) => {
    try {
      const isReportAdded = await service.addNewReport(req.body.name);
      return res.send({
        success: true
      });
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return res.send({
        success: false,
        msg: "There is some problem,Please try after some time"
      });
    }
  },
  addNewChapter: async (req, res) => {
    try {
      const isChapterAdded = await service.addNewChapter(req.body.reportId, req.body.chapterName,req.body.chapterType);
      return res.send({
        success: true
      });
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return res.send({
        success: false,
        msg: "There is some problem, Please try after some time"
      });
    }
  },
  updateChapterName: async (req, res) => {
    try {
      const isChapterUpdated = await service.updateChapterName(req.body.reportId, req.body.newChapterName, req.body.chapterId);
      return res.send({
        success: true
      });
    } catch (err) {
      console.log("There is some problem,Please try after some time", err);
      return res.send({
        success: false,
        msg: "There is some problem, Please try after some time"
      });
    }
  },
  deleteChapter:async(req,res) => {
      try{
          const isChapterDeleted = await service.deleteChapter(req.body.reportId,req.body.chapterId);
          return res.send({
              success:true
          })
      }catch(err){
          console.log("There is some problem, Please try after some time",err);
          return res.send({
              success:false,
              msg:"There is some problem, Please try after some time"
          })
      }
  },
  addSection:async(req,res) => {
      try{
          const isSectionAdded = await service.addSection(req.body.reportId,req.body.chapterId,req.body.sectionName,req.body.sectionType);
          return res.send({
              success:true
          })
      }catch(err){
          console.log("There is some problem, Please try after some time",err);
          return res.send({
              success:false,
              msg:"There is some problem, Please try after some time"
          })
      }
  },
  updateSectionName:async(req,res) => {
      try{
          const isSectionAdded = await service.updateSectionName(req.body.reportId,req.body.newSectionName,req.body.sectionId);
          return res.send({
              success:true
          })
      }catch(err){
          console.log("There is some problem, Please try after some time");
          return res.send({
              success:false,
              msg:"There is some problem, Please try after some time"
          })
      }
  },
  detail:async(req,res) => {
      try{
          const detail = await service.detail(req.query.reportId);
          return res.send(detail);
      }catch(err){
          console.log("There is some problem, Please try after some time",err);
          return res.send({
              success:false,
              msg:"There is some problem, Please try after some time"
          })
      }
  },
  sectionDelete:async(req,res) =>{
      try{
          const sectionDelete = await service.sectionDelete(req.body.reportId,req.body.sectionId);
          return res.send({success:true});
      }catch(err){
          console.log("There is some problem, Please try after some time",err);
          return res.send({
              success:false,
              msg:"There is some problem, Please try after some time"
          })
      }
  }

}

module.exports = data;

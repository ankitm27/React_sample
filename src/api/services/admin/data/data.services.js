const dataModel = require('./data.Model.js');
const s3 = require('./../../../utils/s3.js');
const dataTypesModel = require('./dataTypes.Model.js');
const csv=require('csvtojson');


const data = {
  addData: async (reportId, sectionId, dataType, dataObj, chapterId,subDataType) => {
    try {
      const data = new dataModel({
        reportId: reportId,
        sectionId: sectionId,
        dataType: dataType,
        data: dataObj,
        subDataType: subDataType,
        chapterId:chapterId
      });
      data.save();
      return {
        success: true
      }
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return {
        success: false
      }
    }
  },
  imageUpload: async (imagePath) => {
    try {
      const fileupload = await s3.uploadFile(imagePath);
      return fileupload;
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return {
        success: false,
        msg: "There is some problem, Please try after some time"
      }
    }
  },
  dataTypes:async() => {
      try{
          const dataTypes = await dataTypesModel.find({isPresent:true,},{
             typeName:1,  
             type:1
            })
          return {
              success:true,
              data:{
                  dataTypes:dataTypes
                }
          }
      }catch(err){
          console.log("There is some problem, Please try after some time",err);
          return {
              success:false,
              msg:"There is some problem, Please try after some time"
          }
      }
  },
  graphTypes:async() => {
      try{
          return {
              success:true,
              data:{
                  graphTypes:["bar","column","chart","pie","scatter","line"]
              }
          }
      }catch(err){
          console.log("There is some problem, Please try after some time",err);
          return {
              success:false,
              msg:"There is some problem,Please try after some time"
          }
      }
  },
  viewSection:async(sectionId) => {
    try{
       const sectionData = await dataModel.find({
         sectionId:sectionId
       });
       return {
          success:true,
          data:{
            sectionData:sectionData
          }
        }  
    }catch(err){
      console.log("There is some problem, Please try after some time",err);  
      return {
          success:false, 
          msg:"There is some problem, Please try after some time"
        }
    } 
  },
  readData:async(imagePath) => {
    try{
      const json = await csv().fromFile(imagePath);
      console.log("json",json);
      return {
        success:true,
        data:{
          jsonData:json
        }
      }
    }catch(err){
      console.log("There is some problem, Please try after some time",err);
      return {
        success:false,
        msg:"There is some problem, Please try after some time"
      }
    }
  },
  getContent:async(query,projection)=>{
    try{
      const getContent = await dataModel.find(query,projection);
      return {
        success:true,
        data:getContent
      }
    }catch(err){
      console.log("There is some problem, Please try after some time",err);
      return {
        success:false,
        msg:"There is some problem, Please try after some time"
      }
    }
  }
  
}

module.exports = data;

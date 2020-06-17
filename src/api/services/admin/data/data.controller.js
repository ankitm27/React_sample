const path = require('path');
const multer = require('multer');
const service = require('./data.services.js');


const uploadsPath = path.join(__dirname, './uploads');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req",req);
    cb(null, uploadsPath)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({
  storage: storage
}).single('image')

const data = {
  addData: async (req, res) => {
    try {
      const addData = await service.addData(req.body.reportId, req.body.sectionId, req.body.dataType, req.body.data,req.body.chapterId,req.body.subDataType);
      return res.send({
        success: true
      })
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return res.send(err);
    }
  },
  imageUpload: async (req, res) => {
    try {
      // if(!req.file || !req.file.path){
      //   return res.send({
      //     success:false,
      //     msg:"Please upload the file"
      //   });
      // } 

      console.log("req body", req.body);
      // console.log("req file", req.file);
      upload(req, res, async function (err) {
      //   if (err instanceof multer.MulterError) {
      //       return res.status(500).json(err)
      //   } else if (err) {
      //       return res.status(500).json(err)
      //   }
      // return res.status(200).send(req.file)
      console.log("req file",req.file);
      console.log("req body",req.body);
      if(req.body.type == 'graph' || req.body.type == "table"){
        const data = await service.readData(req.file.path);
        console.log("data",data);
        return res.send(data);
      }else{
        const data = await service.imageUpload(req.file.path);
        return res.send(data);
      }
    })
 
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return res.send({
        success: false,
        msg: "There is some problem, Please try after some time"
      });
    }
  },
  dataTypes: async (req, res) => {
    try {
      console.log("check");
      const dataTypes = await service.dataTypes()
      return res.send(dataTypes);
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return res.send(err);
    }
  },
  graphTypes: async (req, res) => {
    try {
      const graphTypes = await service.graphTypes();
      return res.send(graphTypes);
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return res.send(err);
    }
  },
  viewSection: async (req, res) => {
    try {
      const sectionData = await service.viewSection(req.query.sectionId);
      return res.send(sectionData);
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return res.send(err);
    }
  }


}

module.exports = data;

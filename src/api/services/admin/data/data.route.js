const express = require('express');
const validate = require('express-validation');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controller = require('./data.controller.js');
console.log("uploads path",__dirname);
const uploadsPath = path.join(__dirname, './uploads');

const {
  addData,
  imageUpload
} = require('./data.validation.js');

const auth = require('./../middlewares/auth.js');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadsPath);
//     },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
// var upload = multer({
//   storage: storage
// })


router.route('/addData')
  .post(auth.authenticate, controller.addData);

router.route('/upload/image')
  .post(auth.authenticate,validate(imageUpload),controller.imageUpload);

router.route('/datatypes')
  .get(auth.authenticate,controller.dataTypes)   

router.route('/graphTypes')
   .get(auth.authenticate,controller.graphTypes)

router.route('/viewsection')
   .get(auth.authenticate,controller.viewSection)   

module.exports = router;

const express = require('express');
const validate = require('express-validation');
const router = express.Router();

const controller = require('./report.controller.js');
const {
  addNewReport,
  addNewChapter,
  updateChapterName,
  deleteChapter,
  addSection,
  updateSectionName,
  detail,
  sectionDelete
} = require('./report.validation.js');

const auth = require('./../middlewares/auth.js');

router.route('/getreportlist')
  .get(auth.authenticate,controller.getReportList)

router.route('/addnewreport')
  .post(auth.authenticate,validate(addNewReport), controller.addNewReport);

router.route('/chapter/add')
  .post(auth.authenticate,validate(addNewChapter), controller.addNewChapter);

router.route('/chapter/update')
  .post(auth.authenticate,validate(updateChapterName), controller.updateChapterName);

router.route('/chapter/delete')
  .post(auth.authenticate,validate(deleteChapter), controller.deleteChapter);

router.route('/section/add')
  .post(auth.authenticate,validate(addSection), controller.addSection);

router.route('/section/update')
  .post(auth.authenticate,validate(updateSectionName), controller.updateSectionName);

router.route('/detail')
   .get(auth.authenticate,validate(detail),controller.detail);

router.route('/section/delete')
   .post(auth.authenticate,validate(sectionDelete),controller.sectionDelete);

module.exports = router;

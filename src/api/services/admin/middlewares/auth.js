const jwt = require('jsonwebtoken');

const adminModel = require('./../auth/admin.model.js');

const emailValid = async (email) => {
  try {
    const isEmailPresent = await adminModel.findOne({
      email: email
    })
    if (!isEmailPresent) {
      return {
        success: false,
        msg: "Please provide corrent authnicate token"
      }
    }
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
}

const auth = {
  authenticate: async (req, res, next) => {
    if (!req.headers["token"]) {
      return res.send({
        success: false,
        msg: "Please provide token in headers"
      })
    }
    const token = req.headers["token"];
    const dataObj = jwt.verify(token, "check");
    console.log("data obj", dataObj);
    if (dataObj.type != "admin") {
      return res.send({
        success: false,
        msg: "You are authrized to complete this request"
      });
    }
    const isEmailPresent = await emailValid(dataObj.email)
    if (!isEmailPresent.success) {
      return res.send(err);
    }
    return next();
  }
}

module.exports = auth;

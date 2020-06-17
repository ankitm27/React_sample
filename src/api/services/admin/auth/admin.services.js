"use strict";
const adminModel = require('./admin.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../../../utils/mail.js');
const OTPModel = require('../../OTP.model.js');

const makeHashFromData = async (data) => {
  const hash = bcrypt.hashSync(data, 10);
  return hash;
}
const compareHash = async (password, hashPassword) => {
  const isPasswordRight = bcrypt.compareSync(password, hashPassword);
  return isPasswordRight;
}

const adminService = {
  login: async (email, password) => {
    try {
      const isDataPresent = await adminModel.findOne({
        email: email
      });
      console.log("is data present",isDataPresent);
      if (!isDataPresent) {
        return {
          success: false,
          msg: "Data is not present"
        }
      };
      const isPasswordRight = await compareHash(password, isDataPresent.password);
      if (!isPasswordRight) {
        return {
          success: false,
          msg: "Please provide correct password"
        }
      }
      const token = jwt.sign({
        email: email,
        type:"admin"
      }, "check");
      return {
        success: true,
        data: {
          token: token,
          userType: isDataPresent.userType   
        }
      };
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return {
        success: false,
        msg: "There is some problem, Please try after some time"
      };
    }
  },

  signup: async (email, password,confirmPassword) => {
    try {
      console.log("password",password);
      console.log("confirm password",confirmPassword);
      if(password !== confirmPassword){
        console.log("checj324235");
        return {
          success:false,
          msg:"Password and confirm password are not same"
        }
      }
      const hashPassword = await makeHashFromData(password);
      const signupData = new adminModel({
        email: email,
        password: hashPassword,
        isActive:true,
        userType:"admin"
      })
      const isSignup = await signupData.save();
      return {
        success: true
      };
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return {
        success: false,
        msg: "There is some problem, Please try after some time"
      };
    }
  },

  forgetPassword: async (email) => {
    try {
      const isEmailPresent = await adminModel.findOne({
        email: email
      });
      if (!isEmailPresent) {
        return {
          success: false,
          msg: "Email is not present, Please try with correct email"
        }
      }
      // mail.sendOTPThroughEmail(email);
      return {
        success: true,
        msg: "OTP sent to mail, Please check the mail"
      }
    } catch (err) {
      console.log("There is some error, Please try after some time1", err);
      return {
        success: false,
        msg: "There is some problem, Please try after some time"
      }
    }
  },
  changePasswordThroughOTP: async (OTP, newPassword, newConfirmPassword, email) => {
    try {
      if (newPassword != newConfirmPassword) {
        return {
          success: false,
          msg: "Please provide same new password and new confirm password"
        }
      }
      const isOTPValid = await OTPModel.findOneAndUpdate({
        email: email,
        OTP: OTP,
        isValid: true
      }, {
        isValid: false,
      })
      const hashPassword = await makeHashFromData(newPassword);
      const updatePassword = await adminModel.findOneAndUpdate({
        email: email
      }, {
        password: hashPassword
      });
      return {
        success: true,
        };
    } catch (err) {
      console.log("There is some problem, Please try after some time", err);
      return {
        success: false,
        msg: "There is some problem, Please try after some time"
      }
    }
  },
  changePasswordThroughPassword: async (email, oldPassword, newPassword, newConfirmPassword) => {
      try{
        if(newPassword != newConfirmPassword){
              return {
                  success:false,
                  msg:"Please provide same new password and new confirm poassword"
              }
          }
          const userDetail = await adminModel.findOne({email:email},{
              password:1
          });
          const isPasswordRight = await compareHash(oldPassword,userDetail.password);
          if(!isPasswordRight){
              return {
                  success:false,
                  msg:"Please provide correct old password"
              };        
          }
          const hashPassword = await makeHashFromData(newPassword);
          const updatePassword = await adminModel.findOneAndUpdate({email:email},{
              password:hashPassword
          })
          return {
              success:true
          };


      }catch(err){
          console.log("There is some problem, Please try after some time",err);
          return {
              success:false,
              msg:"There is some problem, Please try after some time"
          };
      }
  },
  getUsers:async() => {
    try{
      const getUsers = await adminModel.find({
        isActive:true,
        userType:'admin'
      },{
        email:1
      })
      return {
        success:true,
        data:{
          getUsers:getUsers
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
  deleteUser:async(userId) => {
    try{
      const deleteUsers = await adminModel.update({
        _id:userId
      },{
        isActive:false
      });
      return {
        success:true
      }
    }catch(err){
      console.log("There is some problem, Please try after some time",err);
      return {
        success:false,
        msg:"There is some problem, Please try after some time"
      }
    }
  }
};

module.exports = adminService;

const nodemailer = require('nodemailer');
const OTPModel = require('./../services/OTP.model.js');


const mail = {
  sendOTPThroughEmail: async (email) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "", // sender email
        pass: "" // sender password
      }
    });
    const OTPObj = await generateOTPAndSaveInDb(email);
    if (OTPObj.success) {
      let info = await transporter.sendMail({
        from: 'anki.malhotra00@gmail.com', // sender address
        to: "ankit.malhotra2506@gmail.com", // list of receivers
        subject: "Forget password OTP ", // Subject line
        text: OTPObj.OTP.toString(), // plain text body
      });
    } else {
      console.log("There is some problem, Please try after some time");
    }
  }
}

const generateOTPAndSaveInDb = async (email) => {
  try {
    const OTP = Math.floor(1000 + Math.random() * Math.floor(9000));
    const saveOTPInDB = new OTPModel({
      email: email,
      OTP: OTP,
      type: "forget password",
      isValid: true
    })
    saveOTPInDB.save();
    return {
      success: true,
      OTP: OTP
    };
  } catch (err) {
    console.log("There is some problem, Please try after some time", err);

  }
}

module.exports = mail;

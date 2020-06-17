const service = require('./admin.services.js');

const adminController = {
    login:async (req,res) => {
        try{
            const data = await service.login(req.body.email,req.body.password);
            return res.send(data);
        }catch(err){
            console.log("There is some problem, Please try after some time",err);
            return res.send(err);
        }
    },
    signup:async (req,res) => {
        try{
            const signupData = await service.signup(req.body.email,req.body.password,req.body.confirmPassword);
            return res.send(signupData);
        }catch(err){
            console.log("There is some problem, Please try after some time",err);
            return res.send(err);
        }
    },
    forgetPassword:async(req,res) => {
        try{
           const mailGenerate = await service.forgetPassword(req.body.email);
           return res.send({success:true});
        }catch(err){
            console.log("There is some problem, Please try after some time",err);
            return res.send(err);
        }
    },
    changePasswordThroughOTP:async(req,res) => {
        try{
            const isPasswordChange = await service.changePasswordThroughOTP(req.body.OTP,req.body.newPassword,req.body.newConfirmPassword,req.body.email);
            return res.send(isPasswordChange);
        }catch(err){
            console.log("There is some problem, Please try after some time1",err);
            return res.send(err);
        }
    },
    changePasswordThroughPassword:async(req,res) => {
        try{
            const isPasswordChange = await service.changePasswordThroughPassword(req.body.email,req.body.oldPassword,req.body.newPassword,req.body.newConfirmPassword);
            return res.send(isPasswordChange);  
        }catch(err){
            console.log("There is some problem, Please try after some time",err);
            return res.send(err);
        }
    },
    getUsers:async(req,res) => {
        try{
            const getUsers = await service.getUsers();
            return res.send(getUsers);
        }catch(err){
            console.log("There is some problem, Please try after some time");
            return res.send(err);
        }
    },
    deleteUser:async(req,res) => {
        try{
            const deleteUser = await service.deleteUser(req.body.userId);
            return res.send(deleteUser);
        }catch(err){
            console.log("There is some problen, Please try after some time");
            return res.send(err);
        }
    }
}

module.exports = adminController;
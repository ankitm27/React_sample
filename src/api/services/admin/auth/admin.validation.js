const joi = require('joi');

module.exports = {
    login:{
        body:{
            email:joi.string().email().required(),
            password:joi.string().required().min(6).max(128)
        }
    },

    signup:{
        body:{
            email:joi.string().email().required(),
            password:joi.string().required().min(6).max(128),
            confirmPassword:joi.string().required().min(6).max(128)
        }
    },
    forgetPassword:{
        body:{
            email:joi.string().email().required(),
        }
    },
    changePasswordThroughOTP:{
        body:{
            OTP:joi.string().required(),
            newPassword:joi.string().required().min(6).max(128),
            newConfirmPassword:joi.string().required().min(6).max(128),
            email:joi.string().email().required()
        }
    },
    changePasswordThroughPassword:{
        body:{
            email:joi.string().required(),
            oldPassword:joi.string().required().min(6).max(24),
            newPassword:joi.string().required().min(6).max(24),
            newConfirmPassword:joi.string().required().min(6).max(128),
            
        }
    },
    deleteUser:{
        body:{
            userId:joi.string().required()
        }
    }
}
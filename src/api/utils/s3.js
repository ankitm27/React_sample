const fs = require('fs');
const AWS = require('aws-sdk');

const {
  awsAccessKey,
  awsSecretAccessKey
} = require('./../../config/vars.js');

const s3 = new AWS.S3({
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecretAccessKey
});

const fileUpload = {
  uploadFile : (fileName) => {
    //   fs.readFile(fileName, (err, data) => {
    //      if (err) {
    //          return {
    //              success:false,
    //              msg:"There is some error in reading the file, Please upload the file after some time"
    //          }
    //      }
    //      const params = {
    //          Bucket: 'testBucket', // pass your bucket name
    //          Key: fileName, 
    //          Body: JSON.stringify(data, null, 2)
    //      };
    //      s3.upload(params, function(s3Err, data) {
    //          if (s3Err){
    //              return {
    //                  success:false,
    //                  msg:"There is some error in uploading the file, Please upload the file after some time"
    //              }
    //          } 
    //          console.log(`File uploaded successfully at ${data.Location}`)
    //      });
    //   });
    return {
      success: true,
      data:{
        fileUrl: "https://file.aws.com/e3256789"
      }  
    }
  }
}

module.exports = fileUpload;

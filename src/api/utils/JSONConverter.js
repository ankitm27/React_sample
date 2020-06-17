const js2XMLConverter = require('js2xmlparser');

const jsonConverter = {
  jsonToXMLConverter: (heading,jsonData) => {
    try {
      const data = js2XMLConverter.parse(heading, jsonData);
      return {
        success: true,
        data: {
          xmlData: data
        }
      }
    } catch (err) {
      console.log("There is some problem, Please try after some time",err);
      return {
          success:false,
          msg:"There are some problem, Please try after some time"
      }
    }
  }
}

module.exports = jsonConverter;

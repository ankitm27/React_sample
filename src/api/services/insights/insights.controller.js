const service = require('./insights.service');

/**
 * Get insights list
 * @public
 */
exports.insights = async (req, res, next) => {
  try {
    const response = await service.insights(req.query);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.getList = async(req,res) => {
  try{
    const getList = await service.getList();
    return res.send(getList);
  }catch(err){
    console.log("There is some problem in getting the list, Please try after some time",err);
    return res.send(err);
  }
}

exports.getContent = async(req,res) => {
  try{
    const getContent = await service.getContent(req.query);
    return res.send(getContent);
  }catch(err){
    console.log("There is some problem in getting the content,Please try after some time",err);
    return res.send(err);
  }
}

exports.getXMLData = async(req,res) => {
  try{
    const getXMLData = await service.getXMLData(req.query);
    return res.download(getXMLData.fileUrl);
  }catch(err){
    console.log("There is some problem in getting the content, Please try after some time",err);
    return res.send(err);
  }
}
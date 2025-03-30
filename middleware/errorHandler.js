const { constant } = require("../constant");
const cors = require("cors");

const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constant.VALIDATION_ERROR:
             res.json({ title:"validation Failed",message: err.message, stackTrace: err.stack});
            
            break;
        case constant.UNAUTHORIZED:
             res.json({ title:"Unauthorized",message: err.message, stackTrace: err.stack});
            
            break;
        case constant.FORBIDEN:
             res.json({ title:"Forbiden",message: err.message, stackTrace: err.stack});
            
            break;
        case constant.SERVER_ERROR:
             res.json({ title:"Server_error", message: err.message, stackTrace: err.stack});
            
            break;
        case constant.NOT_FOUND:
             res.json({ title:"Not Found",message: err.message, stackTrace: err.stack});
        default:
            console.log("No error All Good!");
            break;
    }
    
    
};

module.exports = (errorHandler);
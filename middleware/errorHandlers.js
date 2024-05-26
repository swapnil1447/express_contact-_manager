const {constants} = require('../constants.js')

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode?res.statusCode:500;
    switch(statusCode){
        case (constants.VALIDATION_ERROR):
            res.json({
                title:"validation error",
                message:err.message,
                stackTrace:err.stack
            });
            break;
            default:
                break;
    }

    res.json({message:err.message, stackTrace:err.stack})
}


module.exports = errorHandler
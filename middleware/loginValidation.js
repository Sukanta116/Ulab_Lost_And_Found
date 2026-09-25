//Dependencies
const {check,validationResult} =require('express-validator');
const createError = require("http-errors");


const addLoginValidator = [
    check('userId')  
     .notEmpty()
     .withMessage("User ID is required")
     .trim(),

    check("password")
    .notEmpty()
    .withMessage("Password is required"),
];

const addLoginValidatorHandler =function (req,res,next){
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    
    if(Object.keys(mappedError).length === 0)
       { 
        return next();
       }

    return res.status(400).json({
        message: "Validation Error",
        error : mappedError,
    });

}; 

module.exports ={addLoginValidator,addLoginValidatorHandler};


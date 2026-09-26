//Dependencies
const {check,validationResult} =require('express-validator');
const createError = require("http-errors");

const User = require('../model/User');

const addUserValidator = [
    check('userId')
     .notEmpty()
     .withMessage("User ID is required")
     .trim(),

    check('name')
     .notEmpty()
     .withMessage('User name is required')
     .isAlpha("en-US", { ignore: " -" })
     .withMessage("Name must not contain anything other than alphabet")
     .trim(),

    check('email')
     .notEmpty()   //? notEmpty is for required  //? optional use for not required
     .isEmail()
     .withMessage('EMail is required')
     .trim()
     .custom(async(value)=>{
        try {
            const user =await User.findOne({email:value});
            if (user) {
          throw createError("Email already is use!");
            }
        }
         catch (err) {
            throw createError(err.message);
        }
     }),
      
    check("mobile")
     .isMobilePhone("bn-BD")
     .withMessage("Mobile number must be a valid Bangladeshi mobile number")
     .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
    check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const addUserValidatorHandler =function (req,res,next){
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

module.exports ={addUserValidator,addUserValidatorHandler};


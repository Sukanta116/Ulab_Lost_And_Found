// Dependencies
const express = require('express');
const {registerController,loginController,logoutController}=require('../controllers/authController')
const {addUserValidator,addUserValidatorHandler} = require('../middleware/userValidation')
const {addLoginValidator,addLoginValidatorHandler} = require('../middleware/loginValidation')

const router = express.Router();


//register route
router.post('/register',addUserValidator,addUserValidatorHandler,registerController);

//login route
router.post('/login',addLoginValidator,addLoginValidatorHandler,loginController);

//Logout Route
router.delete('/logout',logoutController) 



module.exports = router;
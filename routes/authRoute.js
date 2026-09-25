// Dependencies
const express = require('express');
const {registerController}=require('../controllers/authController')
const {addUserValidator,addUserValidatorHandler} = require('../middleware/userValidation')

const router = express.Router();


//register route
router.post('/register',addUserValidator,addUserValidatorHandler,registerController);





module.exports = router;
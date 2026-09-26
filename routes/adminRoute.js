// Dependencies
const express = require('express');

const {allUserController,addUserController,userUpdateController,userDeleteController}=require('../controllers/adminController');
const {addUserValidator,addUserValidatorHandler} = require('../middleware/userValidation');
const authenticate = require('../middleware/authenticate');
const {isAdmin} = require('../middleware/roleMiddleware');



const router = express.Router();

//All user route
router.get('/all',authenticate,isAdmin,allUserController);

//Add user route
router.post('/add',authenticate,isAdmin,addUserValidator,addUserValidatorHandler,addUserController);

// Update User route
router.patch('/:id',authenticate,isAdmin,userUpdateController);

// Delete User Route
router.delete('/:id',authenticate,isAdmin,userDeleteController) 



module.exports = router;
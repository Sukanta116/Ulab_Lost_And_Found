// Dependencies
const express = require('express');

const authenticate = require('../middleware/authenticate');
const {isAdminAndStaff,isAdmin} = require('../middleware/roleMiddleware');
const {getFoundItems,postFoundItem,getFoundItemById,updateFoundItemById,deleteFoundItemById} = require('../controllers/foundController');

const router = express.Router();

router
.route('/')
.get(authenticate,getFoundItems)
.post(authenticate,isAdminAndStaff,postFoundItem);


router
.route('/:id')
.get(authenticate,getFoundItemById)
.patch(authenticate,isAdminAndStaff,updateFoundItemById)
.delete(authenticate,isAdmin,deleteFoundItemById);

module.exports = router;
// Dependencies
const express = require('express');

const authenticate = require('../middleware/authenticate');
const {isStudent} = require('../middleware/roleMiddleware');
const {getLostItems,postLostItem,getLostItemById,updateLostItemById,deleteLostItemById} = require('../controllers/lostController');

const router = express.Router();

router
.route('/')
.get(authenticate,getLostItems)
.post(authenticate,isStudent,postLostItem);


router
.route('/:id')
.get(authenticate,getLostItemById)
.patch(authenticate,isStudent,updateLostItemById)
.delete(authenticate,isStudent,deleteLostItemById);

module.exports = router;
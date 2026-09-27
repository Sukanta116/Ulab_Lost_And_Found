// Dependencies
const express = require('express');

const authenticate = require('../middleware/authenticate');
const {isAdminAndStaff,isStudent} = require('../middleware/roleMiddleware');
const {postClaimItem,getClaimItemById,updateClaimItemById} = require('../controllers/claimController');

const router = express.Router();

router.post('/',authenticate,isStudent,postClaimItem);


router.get('/:id',authenticate,isAdminAndStaff,getClaimItemById);

router.patch('/:id/review', authenticate,isAdminAndStaff,updateClaimItemById);

module.exports = router;
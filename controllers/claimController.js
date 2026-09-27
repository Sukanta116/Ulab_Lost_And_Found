// depandencies
const mongoose =require('mongoose');

const User = require('../model/User');
const Claim = require('../model/Claim');


//Post Claim item
async function postClaimItem(req, res) {
    try {
        const data = {
            foundIteam:{
                    id: req.body.id,
                },
            claimant:{
                    id: User._id,
                    name:User.name,
                },
            verificationAnswer : req.body.verificationAnswer,
        };

        const newData= await Claim.create(data);

        res.status(200).json({
            message:"Claim Item Add Successfully",
            claimId: newData._id,
        })
        
    } catch (err) {
        res.status(500).json({
            message: 'Failed to post Claim items',
            error: err.message,
        });
    }
}

// Get by ID
async function getClaimItemById(req, res) {
    try {
        const id = req.params.id;

        //*check id is valid object 
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message : "Invalid ID",
            })
        }

        const data = await Claim.findById(id);

        if(!data){
            return res.status(404).json({
                message : "Data Not Claim!",
            })
        }
        res.status(200).json({
            message : "Data is Claim",
            data,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to get Claim item',
            error: err.message,
        });
    }
}

// Update using ID
async function updateClaimItemById(req, res) {
    try {
        const id = req.params.id;

        //*check id is valid object 
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message : "Invalid ID",
            })
        }

        const {verificationScore, status,reason}= req.body;
        const value = {
            verificationScore,
            status,
            reason,
            reviewedBy:{
                    id:User._id,
                    name: User.name,
                },
        }

        const data = await Claim.findByIdAndUpdate(
        id,
        value,
        { new: true, runValidators: true }
        );
        
        if(!data){
            return res.status(404).json({
                message : "Data Not Claim!",
            })
        }
        res.status(200).json({
            message : "Data Updated Successfully",
            data,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to update item',
            error: err.message,
        });
    }
}


module.exports={postClaimItem,getClaimItemById,updateClaimItemById};
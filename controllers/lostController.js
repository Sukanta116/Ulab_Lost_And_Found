// depandencies
const mongoose =require('mongoose');

const User = require('../model/User');
const Lost = require('../model/Lost');

// Get all Iems 
async function getLostItems(req, res) {
    try {
        const data = await Lost.find({});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to get lost items',
            error: err.message,
        });
    }
}

//Post lost item
async function postLostItem(req, res) {
    try {
        const data = {
             reportedBy: {
                id: req.user._id,
                name : req.user.name,
            },
            title:req.body.title,
            category:req.body.category,
            description:req.body.description,
            lostLocation:req.body.lostLocation,
            lostDate:req.body.lostDate,
                
        };

        await Lost.create(data);

        res.status(200).json({
            message:"Lost Item Add Successfully...",
            lostId: data._id,
        })
        
    } catch (err) {
        res.status(500).json({
            message: 'Failed to post lost items',
            error: err.message,
        });
    }
}

// Get by ID
async function getLostItemById(req, res) {
    try {
        const id = req.params.id;

        //*check id is valid object 
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message : "Invalid ID",
            })
        }

        const data = await Lost.findById(id);

        if(!data){
            return res.status(404).json({
                message : "Data Not Found!",
            })
        }
        res.status(200).json({
            message : "Data is Found",
            data,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to get lost item',
            error: err.message,
        });
    }
}

// Update using ID
async function updateLostItemById(req, res) {
    try {
        const id = req.params.id;

        //*check id is valid object 
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message : "Invalid ID",
            })
        }

        const data = await Lost.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
        );
        
        if(!data){
            return res.status(404).json({
                message : "Data Not Found!",
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

// Delete Using ID
async function deleteLostItemById(req, res) {
    try {
        const id = req.params.id;

        //*check id is valid object 
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message : "Invalid ID",
            })
        }

        const data = await Lost.findByIdAndDelete(id);
        
        if(!data){
            return res.status(404).json({
                message : "Data Not Found!",
            })
        }
        res.status(200).json({
            message : "Data Deleted Successfully",
            data,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to Delete item',
            error: err.message,
        });
    }
}

module.exports={getLostItems,postLostItem,getLostItemById,updateLostItemById,deleteLostItemById};
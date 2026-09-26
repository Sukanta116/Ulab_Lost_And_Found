// depandencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/User');


const allUserController = async(req,res)=>{

    try {
        const data = await User.find({});
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({
            message : "Authentication Error",
            error : err.message,
        })
    }
}

//! Add user
const addUserController = async(req,res)=>{

    try {
        const {userId,name,email,mobile,role} = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        await User.create({
            userId,
            name,
            email,
            mobile,
            password, 
            role, 
        });

        res.status(201).json({
            message: "User registered successfully",
        });

    } catch (err) {
        res.status(500).json({
            message : "Authentication Error",
            error : err.message,
        })
    }
}


//! Update USer
const userUpdateController = async (req, res) => {
    try {
         const id = req.params.id;

        if(! mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message : "Invalid ID",
            });
        }

        const data = await User.findByIdAndUpdate(
            id,req.body,{new:true ,runValidation :true});


        if(!data){
            return res.status(404).json({
                message : "Data Not Found!",
            })
        }
        return res.status(200).json({
            message :"Data Update complete.. ",
            data,
        })


    } catch (err) {
        return res.status(500).json({
            message: "Authentication error",
            error: err.message,
        });
    }
};


//! Delete user
const userDeleteController = async (req, res) => {
    try{
         const id = req.params.id;

        if(! mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message : "Invalid ID",
            });
        }
        const data = await User.findByIdAndDelete(id);
         if(!data){
            return res.status(404).json({
                message : "Data Not Found!",
            })
        }
        res.status(200).json({
            message : "Data Deleted Successfully",
            data,
        })

    }catch(err){
        return res.status(500).json({
            message: "Authentication error",
            error: err.message,
        });
    }
 
};



module.exports = {allUserController,addUserController,userUpdateController,userDeleteController};
// depandencies
const bcrypt = require('bcrypt');
const User = require('../model/User');


//! registration
const registerController = async(req,res)=>{
    try {
        const {userId,name,email,mobile} = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        await User.create({
            userId,
            name,
            email,
            mobile,
            password,  ////NOTE: Only student can register 
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



module.exports = {registerController};
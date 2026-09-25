// depandencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

//! Login
const loginController = async (req, res) => {
    try {
        const { userId, password } = req.body;

        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(401).json({
                message: "Invalid user ID or password",
            });
        }

        const isValidPass = await bcrypt.compare(
            password,
            user.password
        );

        if (!isValidPass) {
            return res.status(401).json({
                message: "Invalid user ID or password",
            });
        }

        const newUser = {
            id: user.userId,
            name: user.name,
            role: user.role,
        };

        const token = jwt.sign(
            newUser,
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        );

        res.cookie(process.env.COOKIE_NAME, token, {
            maxAge: process.env.COOKIE_MAX_AGE,
            httpOnly: true,
            signed: true,
        });

        return res.status(200).json({
            message: "Login successful",
        });
    } catch (err) {
        return res.status(500).json({
            message: "Authentication error",
            error: err.message,
        });
    }
};


//! Logout 
const logoutController = async (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send('logout');
};



module.exports = {registerController,loginController,logoutController};
//Dependencies
const jwt = require('jsonwebtoken');

const authenticate = (req,res,next)=>{
    try{
    const token = req.signedCookies[process.env.COOKIE_NAME];

    if(!token){
        return res.status(401).json({
            message: "Log in required",
        })
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET);

    //set for others controllers
    req.user =decode ;

    next();

} catch (err) {
    return res.status(401).json({
    message: 'Invalid or expired token',
        });
} 

}

module.exports = authenticate;
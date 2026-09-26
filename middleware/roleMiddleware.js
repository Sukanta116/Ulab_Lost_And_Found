//Dependencies

//! use this middleware for role validation
//! Must be use after authenticate middleware

const isAdmin =(req,res,next)=>{
    if(req.user.role.toLowerCase() !="admin"){
        return res.status(403).json({
            message : "Only Admin Can Access",
        });
    }
    
        next();
};

const isAdminAndStaff =(req,res,next)=>{
    if(!['admin', 'staff'].includes(req.user.role.toLowerCase())){
        return res.status(403).json({
            message : "Only Admin and Staff Can Access",
        });
    }
    
        next();
};

const isStudent =(req,res,next)=>{
    if(req.user.role.toLowerCase() !="student"){
        return res.status(403).json({
            message : "Only student Can Access",
        });
    }
    
        next();
};

module.exports = {isAdmin,isAdminAndStaff,isStudent};
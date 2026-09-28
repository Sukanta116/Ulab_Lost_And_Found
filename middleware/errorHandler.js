const createError = require('http-errors');

// 404 notFound

function notFoundHandler(req,res,next){
    next(createError(404,'This url not exist'));
}

// Default Error Handling middleware

function errorHandler(err,req,res,next){
    res.json({
        status : err.status,
        message : err.message,
    });
    res.send();
}

module.exports ={notFoundHandler,errorHandler};
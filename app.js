// Depandencies 
const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const cookieParser = require("cookie-parser");

const lostRoute =require('./routes/lostRoute');
const foundRoute =require('./routes/foundRoute');
const claimRoute =require('./routes/claimRoute');
const authRoute =require('./routes/authRoute');
const adminRoute =require('./routes/adminRoute');
const {notFoundHandler,errorHandler} = require('./middleware/errorHandler');


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/lost',lostRoute);
app.use('/found',foundRoute);
app.use('/claim',claimRoute);
app.use('/user',authRoute);
app.use('/admin/user',adminRoute);

//* Return a Promise
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Connection with database establised..'))
.catch((err)=>console.log(err));

// Not found route
app.use(notFoundHandler);

//Handling Default errors
app.use(errorHandler);


app.listen(process.env.PORT ,()=>{
    console.log(`App listening on ${process.env.PORT}.......`);
})









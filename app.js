// Depandencies 
const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv');


const app = express();
dotenv.config();

//* Return a Promise
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Connection with database establised..'))
.catch((err)=>console.log(err));





app.listen(process.env.PORT ,()=>{
    console.log(`App listening on ${process.env.PORT}.......`);
})









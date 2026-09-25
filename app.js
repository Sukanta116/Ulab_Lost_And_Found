// Depandencies 
const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv');

const lostRoute =require('./routes/lostRoute');
const foundRoute =require('./routes/foundRoute');
const claimRoute =require('./routes/claimRoute');
const authRoute =require('./routes/authRoute');


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/lost',lostRoute);
app.use('/found',foundRoute);
app.use('/claim',claimRoute);
app.use('/user',authRoute);


//* Return a Promise
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Connection with database establised..'))
.catch((err)=>console.log(err));





app.listen(process.env.PORT ,()=>{
    console.log(`App listening on ${process.env.PORT}.......`);
})









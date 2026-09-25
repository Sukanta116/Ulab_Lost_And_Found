//Depandencies 
const mongoose = require('mongoose');

const claimSchema = mongoose.Schema({
    lostIteam:{
        id:mongoose.Types.ObjectId,
        title:String,
    },
    foundIteam:{
        id:mongoose.Types.ObjectId, 
        title:String,
    },
    claimant:{
        id:mongoose.Types.ObjectId, //! User
        name:String,
    },
    verificationScore:{
        type:Number,
          min: 0,
         max: 100,
        required:[true,'Verification Score is required'],
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        required:[true,'Status is required'],
        default :'pending',
    },
    reason:{
        type:String,
        
    },
    reviewedBy:{
        id:mongoose.Types.ObjectId,
        name:String,
    }
},
{
     timestamps: true,
});

const Claim = mongoose.model("Claim",claimSchema);

module.exports=Claim;

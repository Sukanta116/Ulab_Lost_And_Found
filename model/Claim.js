//Depandencies 
const mongoose = require('mongoose');

const claimSchema = mongoose.Schema({
    foundIteam:{
        id:mongoose.Types.ObjectId,
    },
    claimant:{
        id:mongoose.Types.ObjectId, //! User
        name:String,
    },
    verificationAnswer:[{
            answer :{
                type:String,
                required: [true,'Answer is required'],
            },
        },
        ],
    verificationScore:{
        type:Number,
          min: 0,
         max: 100,
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
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

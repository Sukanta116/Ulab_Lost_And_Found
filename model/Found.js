const mongoose = require('mongoose');

const foundSchema = new mongoose.Schema(
    {
        addedBy: {
           id:mongoose.Types.ObjectId,
           name : String,
           role :String,
        },

        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        category :{
            type:String,
            required: [true, 'category is required'],
        },
        description :{
            type :String,
            required: [true, 'Description is required'],
        },
        foundLocation:{
            type:String,
            required: [true, 'Location is required'],
        },
        foundDate:{
            type:Date,
        },
        verificationQuestions:[{
            quesion :{
                type:String,
                required: [true,'Quesion is required'],
            },
            expectedAns:{
                type:String,
                required: [true,'Answer is required'],
            },
        },
        ],
        status:{
            type:String,
            enum:['active','matched','recovered'],
            required: [true,'Satuts Must be use'],
            default :'active',
        },
    },
       
    {
        timestamps: true,
    }
);

const Found = mongoose.model('Found', foundSchema);

module.exports = Found;
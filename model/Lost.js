const mongoose = require('mongoose');

const lostSchema = new mongoose.Schema(
    {
        reportedBy: {
           id:mongoose.Types.ObjectId,
           name : String,
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
        lostLocation:{
            type:String,
            required: [true, 'Location is required'],
        },
        lostDate:{
            type:Date,
        },
        status:{
            type:String,
            enum:['active','matched','recovered'],
            default :'active',
        },
    },
       
    {
        timestamps: true,
    }
);

const Lost = mongoose.model('Lost', lostSchema);

module.exports = Lost;
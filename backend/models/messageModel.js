const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({

    content : {
        type : String ,
        required : true
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId ,
        required : true ,
        ref : 'User'
    } ,
    recipients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to User model for multiple recipients
        },
    ],
},
{
    timestamps : true
}
);

module.exports = mongoose.model("Msg" , msgSchema);
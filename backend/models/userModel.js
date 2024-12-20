const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    } , 
    email : {
        type : String,
        required : true,
        unique: true,
    }, 
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    } , 
    isOnline : {
        type : Boolean,
        default : 0 ,
    },
    
},{timestamp : true}  //add createdAt and updatedAt
);

module.exports = mongoose.model('User' , userSchema )

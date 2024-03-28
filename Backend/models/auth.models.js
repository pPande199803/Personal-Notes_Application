const mongoose = require("mongoose");

const notesAuth = new mongoose.Schema({
    "emailId":{
        type:String,
        required:true,
    },
    "userName":{
        type:String,
        required:true,
    },
    "password":{
        type:String,
        required:true
    }
},{timeStamps:true})


module.exports = mongoose.model("NotesAuth", notesAuth)
const mongoose = require("mongoose")

const notes_Schema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    notesTitle:{
        type:String,
        required:true
    },
    notesDec:{
        type:String,
        required:true
    },
    // notesStatus:{
    //     type:String,
    //     required:true,
    //     default:false,
    // },
    // notesAddTime:{
    //     type:Date,
    //     default:mongoose.now()
    // }

},{timestamps:true})

module.exports = mongoose.model('Note',notes_Schema)
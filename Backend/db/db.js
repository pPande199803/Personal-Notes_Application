const mongoose = require("mongoose")


const dbConnect = (uri) =>{
    try {
       mongoose.connect(uri).then(()=>{
        console.log("DataBase Connected SuccessFully..")
       })
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnect
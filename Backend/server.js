const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const dbConnected = require("./db/db")

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

dbConnected(process.env.MONGO_URL)

app.get('/', (req,res)=>{
    res.send("Hello, Welcome On Server")
    console.log("Wellcome On Server..")
})

app.use('/api/notes/', require('./router/notes_router'))
app.use('/api/notes/', require('./router/auth.routes'))

app.listen(PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})
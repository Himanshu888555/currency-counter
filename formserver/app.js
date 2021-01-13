const express = require("express")
const app=express();
const mongoose = require("mongoose")
const dotenv= require('dotenv')
dotenv.config()

const PORT = 5000

const {MONGOURI}= process.env

console.log(MONGOURI)

// const {MONGOURI} = require('./keys')

mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})

mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

//user schema
require('./models/rate')
//post schema
// require('./models/post')

app.use(express.json()) //for parsing json data 
app.use(require('./routes/rate')) //registering the route in the main file app.js
// app.use(require('./routes/post'))


app.listen(PORT,()=>{             // .listen for connections on the given path
    console.log("server is running on",PORT)
})


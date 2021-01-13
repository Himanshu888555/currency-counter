const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({
    base:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    rates:{
        type:Object,
    }
})

mongoose.model("Rate",rateSchema)
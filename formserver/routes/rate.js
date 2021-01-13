const express = require('express')
const router = express.Router()
const mongoose = require('mongoose') //for router method to connect actual database for sign up 
const Rate = mongoose.model("Rate") 


router.get('/rates',(req,res)=>{

    Rate.findOne({base:"EUR"})  // findOne is the mongo db operator for finding one element in the database so here email.  then it will check email already exists or not.
    .then((result)=>{
        res.json(result.rates);        
    })
    .catch(err=>{res.status(422).json({err:err})}) 
}) 

router.post('/count',(req,res)=>{
    
    const {currency1,price1,currency2,price2}=req.body
    
    Rate.findOne({base:"EUR"})
    .then((result)=>{
        let rate = Object.keys(result.rates)
        let ratevalue =Object.values(result.rates)
        let value1=0,value2=0;
        for(let key in rate){
            if(rate[key]===currency1){
                value1= ratevalue[key]
            }

            if(rate[key]===currency2){
                value2=ratevalue[key]
            }
        }
        res.status(200).send({
            value1:(price1===0||price2===0)?0:value1,
            value2:(price1===0||price2===0)?0:value2,
            result: (value1===0||value2===0)?0:((value2/value1)*price1).toFixed(4)
        })
    })

})


router.post('/initadd', async(req,res)=>{ 
    
    let rate = new Rate()

    let countrycurr={
        "USD":"1.2161",
        "IND":"89.0915",
        "AUD":"1.5742",
        "CAD":"1.551",
        "JPY":"126.74"
    }

    rate.base="EUR"
    rate.date="2021-01-12"
    rate.rates=countrycurr

    res.send(rate)
    return await rate.save()
}) 


router.post('/add', async(req,res)=>{

    const {countrycurr}=req.body
    res.status(200).send({countrycurr})
    return await Rate.findOneAndUpdate({base:"EUR"},{$set:{rates:countrycurr}})

}) 


module.exports = router 
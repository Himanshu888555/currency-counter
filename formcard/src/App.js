import React, { useState, useEffect } from "react";

import './App.css';

function App() {

    const [rates,setRates]=useState([])
    const [input1,setInput1]=useState(0)
    const [input2,setInput2]=useState(1)
    const [currency1,setCurrency1]=useState("IND")
    const [currency2,setCurrency2]=useState("USD")
    const [result,setResult]=useState(0)

    useEffect(()=>{
      fetch('/rates',{
        method:"get",
        // headers:{
        //     "Content-type":"application/json"
        // },
        // body:data1
    }).then(res=>res.json())
    .then(result=>{
      setRates(result)
    })
    .catch((err)=>{
      console.log(err);
    })
    },[])
    
    const rateslist= Object.keys(rates)
    console.log("rates: ",rateslist,input1,input2,currency1,currency2,result)
    

    useEffect(()=>{

      if(currency1!=="" && currency2!==""){
      fetch('/count',{
        method:"post",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
          currency1:currency1,
          price1:input1,
          currency2:currency2,
          price2:input2
        })
      }).then(result=>result.json())
      .then(result=>{
        setResult(result.result)
      })
    }else{
      console.log("select currency")
    }

    },[input1,input2,currency1,currency2])



  return (
    <div className="container">
      <div className="card">
        <div className="head"> Currency Exchange</div>
          <div className="getTime">
            <input id="first" type="number" style={{marginRight:"20px"}} onChange={(e)=>setInput1(e.target.value)}></input>
                <select value={currency1} onChange={(e)=>setCurrency1(e.target.value)}>
                {rateslist.map((res)=>{
                    return(<option value={res}>{res}</option>)
                  })
                }
                </select>
                <span style={{marginLeft:"20px",marginRight:"20px"}}>to</span>
                <select value={currency2} onChange={(e)=>setCurrency2(e.target.value)}>
                {rateslist.map((res)=>{
                    return(<option value={res}>{res}</option>)
                  })
                }
                </select>
          </div>
          
          <div className="display">
            <span>
              {(result===0)?
              <span>Please enter amount and select currency </span>
              :result}
            </span>
          </div>
      </div>
    </div>
  );
}

export default App;

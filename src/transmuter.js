import React, { useState,useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import App from "./App";
import './App.css';
import synth from "./syntheticabi";
import Popup from 'reactjs-popup';
import transmuterabi from "./transmuterabi";


//import {useState} from 'react';
import web3 from './web3';

function Transmuter(){
     const[ap1,setAP] = useState("");
     const[tid,setId] = useState("");
     const[tid1,setId1] = useState("");
     var[balan,setbalan] = useState("");
     const[values,setValues] = useState([]);


const first = async () => {
    const accounts =  await web3.eth.getAccounts();
    if(accounts!=0){
        document.getElementById("cc").style.visibility="hidden";
         document.getElementById("cc1").innerHTML=accounts;
    setbalan(await synth.methods.balanceOf(accounts[0]).call());
    console.log("balance",balan);
    
    console.log("balance",balan);

    let b= await synth.methods.allowance(accounts[0],"0x380EF5B39F3F68EF7c80f21384F92EEB0a4c06Cd").call();
 
    if(b>0){
      setAP(true);
    }
    else{
      setAP(false);
    }
    setValues(await transmuterabi.methods.userInfo(accounts[0]).call());
}
else{
  document.getElementById("cc").style.visibility="true";

}
   
}
useEffect(()=>{first()},[ap1,values[0],values[1],values[3]])

const connect = async() => {
    window.ethereum.enable();
    
   
 //document.getElementById("cc").style.visibility="hidden";
 document.getElementById("cc").style.visibility="hidden";
 }

const approve = async() => {
    let account = await web3.eth.getAccounts();
    let amount = 1000000000000000000 +"000000000000000000"; 
    await synth.methods.approve("0x380EF5B39F3F68EF7c80f21384F92EEB0a4c06Cd",amount).send({from:account[0]});
    first()
    alert("Approved Succesfully")
}
const deposit = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    var val = tid * 1000000000;
    var value = val + "000000000"
    await transmuterabi.methods.stake(value).send({from:accounts[0]});
    alert("deposited succesfully")
    first()
  }
  const withdraw = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    var val = tid1 * 1000000000;
    var value = val + "000000000"
    await transmuterabi.methods.unstake(value).send({from:accounts[0]});
    alert("withdrawn succesfully")
    first()
  }
  const transmute = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    if(values[2] > 0){
      await transmuterabi.methods.transmute().send({from:accounts[0]});
      alert("Transmute succesfully")
    }
    else{
      alert("You dont have Transmutable BASE token")
    }
    first()
  }

  const claim = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    if(values[3] > 0){
      await transmuterabi.methods.claim().send({from:accounts[0]});
      alert("claim succesfully")
    }
    else{
      alert("You dont have Transmutable BASE token to claim")
    }
    first()
  }
  const transmuteClaimAndWithdraw = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    if(values[3] > 0){
      await transmuterabi.methods.transmuteClaimAndWithdraw().send({from:accounts[0]});
      alert("Claim and withdraw succesfully")
    }

    else{
      alert("You dont have enough Base Token")
    }
    
    first()
  }
    return (
        <div className="App">
            <button id="cc" class="btn btn-info btn-bloc" style={{marginLeft:"800px"}} onClick={connect}>connect wallet</button>
        <button id="cc1" class="btn btn-info btn-bloc" style={{marginLeft:"800px"}} ></button>

           <h3>Transmuter</h3>
               <br></br><br></br>
               <text>Your wallet Balance:  &nbsp;{parseFloat(balan/1000000000000000000).toFixed(5)} &nbsp;<b>SYNTHETIC</b></text><br></br> 
               <br></br>
               <text>Your Deposited Balance:  &nbsp;{parseFloat(values[0]/1000000000000000000).toFixed(5)} &nbsp;<b>SYNTHETIC</b></text><br></br> 
               <br></br>
               <text>Your Transmutable BASE Token:  &nbsp;{parseFloat(values[2]/1000000000000000000).toFixed(5)} &nbsp;<b>BASE</b></text><br></br> 
               <br></br>
               <text>Your BASE Token:  &nbsp;{parseFloat(values[3]/1000000000000000000).toFixed(5)} &nbsp;<b>BASE</b></text><br></br> 
               <br></br>
 
  <Popup trigger={<button class="btn btn-primary " > Deposit</button>} position="bottom center"><br />

<div>         

{ ap1 === false ? 
(
(
<div>
<h4 style={{marginLeft:"400px"}}>Before Deposit we want to approve first</h4>
<br />
<button class="btn btn-primary" style={{marginLeft:"400px"}} onClick={approve}>Approve</button>
</div>
)
):
(
(
<div>
<div class="text-white bg-dark">Enter the amount you want to Deposit</div>
  <input type = "number" name="tid" required onChange={event => setId( event.target.value)} />
  <button class="btn btn-primary" onClick = {deposit} >Confirm</button>
        
</div>
)
)}
  </div> 

 

 
  </Popup>
  &nbsp;
      <Popup trigger={<button class="btn btn-primary">  Withdraw</button>} position="bottom center"><br />
    <div class="text-white bg-dark">Enter the amount you want to withdraw</div>
    <input type = "number"  name="tid1" required onChange={event => setId1( event.target.value)} />
    <button class="btn btn-primary" onClick={withdraw} >Confirm</button>
    </Popup>
    &nbsp;
    <button class="btn btn-primary" onClick={transmute} >Transmute</button>
    &nbsp;
    &nbsp;
    <button class="btn btn-primary" onClick={claim} >Claim</button>
    &nbsp;
    <button class="btn btn-primary" onClick={transmuteClaimAndWithdraw} >Transmute & Exit</button>
        </div>
    );
}
export default Transmuter;
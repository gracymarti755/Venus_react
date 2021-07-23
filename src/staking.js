import React, { useState,useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import App from "./App";

import synth from "./syntheticabi";
import Popup from 'reactjs-popup';
import stakingabi from "./stakingabi";
import alch from "./alchabi";

import web3 from './web3';

function Staking(){
    const[ap1,setAP] = useState("");
    const[altoken,setAl] = useState("");
    const[dep,setDep] = useState("");
    const[unclaim,setUnclaim] = useState("");
    const[balan,setBalan] = useState("");
    const[tid,setId] = useState("");
    const[tid1,setId1] = useState("");


    const first = async () => {

        const accounts =  await web3.eth.getAccounts();
        if(accounts!=0){
            document.getElementById("cc").style.visibility="hidden";
             document.getElementById("cc1").innerHTML=accounts;
        setAl(await synth.methods.balanceOf(accounts[0]).call());
        var l = await stakingabi.methods.getStakeTotalDeposited(accounts[0],0).call();
        setDep(l);
        
        setUnclaim(await stakingabi.methods.getStakeTotalUnclaimed(accounts[0],0).call());
        
        setBalan(await alch.methods.balanceOf(accounts[0]).call());
        let b= await synth.methods.allowance(accounts[0],"0xd8dE999aeb4C8587D9356d13c342615663Ab8861").call();
        if(b>0){
            setAP(true);
        }
        else{
            setAP(false);
        }
    }
    else{
      document.getElementById("cc").style.visibility="true";
    
    }
        

    }
    useEffect(()=>{first()},[altoken,dep,unclaim,balan])
    var x = setInterval(function(){
        first()
    },1000);
    const connect = async() => {
        window.ethereum.enable();
        
       
     //document.getElementById("cc").style.visibility="hidden";
     document.getElementById("cc").style.visibility="hidden";
     }
    const approve = async() => {
        let account = await web3.eth.getAccounts();
        let amount = 1000000000000000000 +"000000000000000000"; 
        await synth.methods.approve("0xaf602e3403292B82dB4883e38050A14c07F481D9",amount).send({from:account[0]});
        alert("Approved Succesfully")
        first()
        
    }
   const stake = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    var val = tid * 1000000000;
    var value = val + "000000000"
    await stakingabi.methods.deposit(0,value).send({from:accounts[0]});
    alert("Staking succesfully Done")
    first()
   }
   const unstake = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    var val = tid1 * 1000000000;
    var value = val + "000000000"
    await stakingabi.methods.withdraw(0,value).send({from:accounts[0]});
    alert("unstake succesfully Done")
    first()
   }
   const claim = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    if(unclaim > 0){
        await stakingabi.methods.claim(0).send({from:accounts[0]});
        alert("Rewards Claimed")
    }
    else{
        alert("Not Sufficient Reward to claim")
    }
    first()
   }
   const exit = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    
    await stakingabi.methods.exit(0).send({from:accounts[0]});
    alert("Exit")
    first()
   }

    return (
        <div> 
            <button id="cc" class="btn btn-info btn-bloc" style={{marginLeft:"800px"}} onClick={connect}>connect wallet</button>
        <button id="cc1" class="btn btn-info btn-bloc" style={{marginLeft:"800px"}} ></button>
        <h4>Staking</h4>
        <br></br><br></br>
        <text>Your Balance : {parseFloat(altoken/1000000000000000000).toFixed(5)} SYNTHETIC </text><br></br>
        <br></br>
        <text>Your Deposited : {parseFloat(dep/1000000000000000000).toFixed(5)} SYNTHETIC</text><br></br>
        <br></br>
        <text>Your Rewards : {parseFloat(unclaim/1000000000000000000).toFixed(18)} REWARD</text><br></br>
        <br></br>
        <text>Balance : {parseFloat(balan/1000000000000000000).toFixed(5)} REWARD</text><br></br>
        <br></br><br></br><br></br>

<div>         

{ ap1 === false ? 
(
(
<div>
<h4 >Before Deposit we want to approve first</h4>
<br />
<button class="btn btn-primary"  onClick={approve}>Approve</button>
</div>
)
):
(
(
<div>

<div class="text-white "><b>Enter the amount you want to stake</b></div>
    <input type = "number"  name="tid" size="5%" required onChange={event => setId( event.target.value)} />
    <button class="btn btn-primary" onClick={stake} >stake</button> 
    <br></br>
        <br></br>
             <div class="text-white"><b>Enter the amount you want to unstake</b></div>
    <input type = "number"  name="tid1"  required onChange={event => setId1( event.target.value)} />
    <button class="btn btn-primary" onClick={unstake} >Unstake</button>
        <br></br> <br></br><br></br>
        <button class="btn btn-primary" onClick={claim} >Claim</button>
        &nbsp;
        <button class="btn btn-primary" onClick={exit} >Exit</button>   
</div>
)
)}
  </div> 
             
         
</div>  
    )
}
export default Staking;
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

        setAl(await synth.methods.balanceOf(accounts[0]).call());
        setDep(await stakingabi.methods.getstakingTotalDeposited(accounts[0],0).call());
        
        setUnclaim(await stakingabi.methods.getstakingTotalUnclaimed(accounts[0],0).call());
        
        setBalan(await alch.methods.balanceOf(accounts[0]).call());
        let b= await synth.methods.allowance(accounts[0],"0xd8dE999aeb4C8587D9356d13c342615663Ab8861").call();
        if(b>0){
            setAP(true);
        }
        else{
            setAP(false);
        }
        

    }
    useEffect(()=>{first()},[altoken,dep,unclaim,balan])
    var x = setInterval(function(){
        first()
   },1000);

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
    var val = tid * 1000000000;
    var value = val + "000000000"
    await stakingabi.methods.withdraw(0,value).send({from:accounts[0]});
    alert("unstake succesfully Done")
    first()
   }
   const claim = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
   
    await stakingabi.methods.claim(0).send({from:accounts[0]});
    alert("Rewards Claimed")
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
        <h4>Staking</h4>
        <br></br><br></br>
        <text>Your Balance : {parseFloat(altoken/1000000000000000000).toFixed(5)} SYNTHETIC </text><br></br>
        <br></br>
        <text>Your Deposited : {parseFloat(dep/1000000000000000000).toFixed(5)} SYNTHETIC</text><br></br>
        <br></br>
        <text>Your Rewards : {parseFloat(unclaim/1000000000000000000).toFixed(18)} REWARD</text><br></br>
        <br></br>
        <text>Balance : {parseFloat(balan/1000000000000000000).toFixed(5)} REWARD</text><br></br>
        <br></br>
             <div class="text-white ">Enter the amount you want to stake</div>
    <input type = "number"  name="tid" required onChange={event => setId( event.target.value)} />
    <button class="btn btn-primary" onClick={stake} >stake</button>
        <br></br>
        <br></br>
             <div class="text-white">Enter the amount you want to unstake</div>
    <input type = "number"  name="tid1"  required onChange={event => setId1( event.target.value)} />
    <button class="btn btn-primary" onClick={unstake} >Unstake</button>
        <br></br> <br></br><br></br>
        <button class="btn btn-primary" onClick={claim} >Claim</button>
        &nbsp;
        <button class="btn btn-primary" onClick={exit} >Exit</button>
</div>  
    )
}
export default Staking;
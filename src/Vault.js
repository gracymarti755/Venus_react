import React, { useState,useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import App from "./App";
import './App.css';
import Alchemist from "./Alchemistabi";
import basetoken from "./borrow";
import synth from "./syntheticabi";
import Popup from 'reactjs-popup';

//import {useState} from 'react';
import web3 from './web3';

function Vault() {
 

  
    const [tid,setId] = useState("");
     const [tid1,setId1] = useState("");
     const[tid3,setId3] = useState("");
     const[tid2,setId2] = useState("");
     const[tid4,setId4] = useState("");
     const[totaldep,setTotaldeposit] = useState("");
     const[totaldebt,setTotaldebt] = useState("");
     const[avalwithdraw,setAvalwithdraw] = useState("");
     const[avaltoborrow,setAvalborrow] = useState("");
     const[balance,setbalance] = useState("");
var[balan,setbalan] = useState("");
var[app1,setApp] = useState("");
var[ap1,setAP] = useState("");

    // var [tid2,setId2] = useState([]);
  
    var [tid5,setId5] = useState([]);
    // let r = [];
   const bal = async () => {
 
      const accounts =  await web3.eth.getAccounts();
      if(accounts!=0){
        document.getElementById("cc").style.visibility="hidden";
         document.getElementById("cc1").innerHTML=accounts;
   
      var totaldeposit = await Alchemist.methods.getCdpTotalDeposited(accounts[0]).call();
      setTotaldeposit(totaldeposit);
      var totaldebited = await Alchemist.methods.getCdpTotalDebt(accounts[0]).call();
      setTotaldebt(totaldebited);
      var collaterallimit=await Alchemist.methods.collateralizationLimit().call();
      setAvalwithdraw(totaldep - (totaldebt * collaterallimit)/1000000000000000000);
      var av = (totaldep * 50)/100;
      var bb = av - totaldebt;
      setAvalborrow(bb);
      setbalance(await basetoken.methods.balanceOf(accounts[0]).call());
      setbalan(await synth.methods.balanceOf(accounts[0]).call());
      let a = await basetoken.methods.allowance(accounts[0],"0x81ccB9a3a1df0A01eEd52bBAA4b6363C38BbEEfC").call();
       if(a>0){
        setApp(true);
      }
      else{
        setApp(false);
      }
      
      let b= await synth.methods.allowance(accounts[0],"0x81ccB9a3a1df0A01eEd52bBAA4b6363C38BbEEfC").call();
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
  //  alert(tid3[1]);
   useEffect(()=>{bal()},[totaldep,totaldebt,avalwithdraw,avaltoborrow,balance,balan,app1,ap1])
   const connect = async() => {
    window.ethereum.enable();
    
   
 //document.getElementById("cc").style.visibility="hidden";
 document.getElementById("cc").style.visibility="hidden";
 }
  const deposit = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    var val = tid * 1000000000;
    var value = val + "000000000"
    await Alchemist.methods.deposit(value).send({from:accounts[0]});
    alert("deposited succesfully")
    bal()
  }
  const withdraw = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    
    var val = tid1 * 1000000000;
    var value = val + "000000000"
    await Alchemist.methods.withdraw(value).send({from:accounts[0]});
    alert("withdrawn succesfully")
    bal()
  }
  const borrow = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    
    var val = tid2 * 1000000000;
    var value = val + "000000000"
    await Alchemist.methods.mint(value).send({from:accounts[0]});
    alert("Borrowed succesfully");
    bal()
  }
  const repayborrow = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
   
    var val = tid3 * 1000000000;
    var value = val + "000000000"
    await Alchemist.methods.repay(0,value).send({from:accounts[0]});
    alert("Borrow amount is repayed")
    bal()
  }
  const repayborro = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
   
    var val = tid5 * 1000000000;
    var value = val + "000000000"
    await Alchemist.methods.repay(value,0).send({from:accounts[0]});
    alert("Borrow amount is repayed")
    bal()
  }
  const liquidate = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    
    var val = tid4 * 1000000000;
    var value = val + "000000000"
    await Alchemist.methods.liquidate(value).send({from:accounts[0]});
    alert("liquidate succesfully")
    bal()
  }
  const approve = async() => {
    let account = await web3.eth.getAccounts();
    let amount = 1000000000000000000 +"0000000000"; 
    await basetoken.methods.approve("0x81ccB9a3a1df0A01eEd52bBAA4b6363C38BbEEfC",amount).send({from:account[0]});
    bal()
    alert("Approved Succesfully")
  }
  const approv = async() => {
    let account = await web3.eth.getAccounts();
    let amount =  1000000000000000000 +"000000000000000000"; 
    await synth.methods.approve("0x81ccB9a3a1df0A01eEd52bBAA4b6363C38BbEEfC",amount).send({from:account[0]});
    bal()
    alert("Approved Succesfully")
  }
    
  
    return (    
  
      <div className="App">
        <button id="cc" class="btn btn-info btn-bloc" style={{marginLeft:"800px"}} onClick={connect}>connect wallet</button>
        <button id="cc1" class="btn btn-info btn-bloc" style={{marginLeft:"800px"}} ></button>

        <h1>Vault</h1>
  
        
  <center>
  <br></br>
  
  
          <form onSubmit ={bal} id="create-course-form" >
     
       
      </form>
  
     
      <br /> 
     
  <Popup trigger={<button class="btn btn-primary " > Deposit</button>} position="bottom center"><br />

  <div>         

{ app1 === false ? 
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
      <Popup trigger={<button class="btn btn-primary">  Borrow</button>} position="bottom center"><br />
    <div class="text-white bg-dark">Enter the amount you want to  Borrow</div>
    <input type = "number"  name="tid2" required onChange={event => setId2( event.target.value)} />
    <button class="btn btn-primary" onClick={borrow} >Confirm</button>
    </Popup>
    &nbsp;
      <Popup trigger={<button class="btn btn-primary">  Repay Borrow</button>} position="bottom center"><br />
    
      <div>         

{ ap1 === false ? 
(
(
<div>
<h1>Before Repay we want to approve first</h1>
<br />
<button class="btn btn-primary" onClick={approv}>Approve</button>
</div>
)
):
(
(
<div>
<div class="text-white bg-dark">Enter the amount you want to Repay Borrow</div>
<input type = "number"  name="tid5" required onChange={event => setId3( event.target.value)} />
    <button class="btn btn-primary" onClick={repayborrow} >Confirm</button>
        
         
</div>
)
)}
    </div> 
 
            
    </Popup>
    &nbsp;
      <Popup trigger={<button class="btn btn-primary">  Repay Borrow bY BASE token</button>} position="bottom center"><br />
    
   
            <div class="text-white bg-dark">Enter the amount you want to Repay Borrow</div>
<input type = "number"  name="tid3" required onChange={event => setId5( event.target.value)} />
    <button class="btn btn-primary" onClick={repayborro} >Confirm</button>
        
    
    </Popup>
    &nbsp;
      <Popup trigger={<button class="btn btn-primary">  Liquidate</button>} position="bottom center"><br />
    <div class="text-white bg-dark">Enter the amount you want to Repay Borrow by liquidating your collateral</div>
    <input type = "number"  name="tid4" required onChange={event => setId4( event.target.value)} />
    <button class="btn btn-primary" onClick = {liquidate}>Confirm</button>
    </Popup>
    <br></br>
  <br></br> <br></br>
  <br></br><br></br> <br></br>
  <br></br> <br></br>
  
  

  <h3>Deposits</h3>
  <br></br>
  <text>Your wallet Balance :  &nbsp;{parseFloat(balance/1000000000000000000).toFixed(5)} &nbsp;<b>BASE</b></text><br></br>  
  <br></br>
  <text>Total deposited Balance  :   &nbsp;{ parseFloat(totaldep/1000000000000000000).toFixed(5)} &nbsp;<b>BASE</b></text> <br></br>
  <br></br>
 <text>Availbe to withdraw:  &nbsp;{parseFloat(avalwithdraw/1000000000000000000).toFixed(5)} &nbsp;<b>BASE</b></text> <br></br>
  <br></br>
<br></br>

<h3>Borrow</h3>
<br></br><br></br>

  <text>Remaining Token to debt   :  &nbsp;{parseFloat(totaldebt/1000000000000000000).toFixed(5)} &nbsp;<b>SYNTHETIC</b></text> <br></br>
  <br></br>
  <text>Available to borrow:  &nbsp;{parseFloat(avaltoborrow/1000000000000000000).toFixed(5)} &nbsp;<b>SYNTHETIC</b></text><br></br> 
  <br></br>
<text>Your wallet Balance:  &nbsp;{parseFloat(balan/1000000000000000000).toFixed(5)} &nbsp;<b>SYNTHETIC</b></text><br></br> 

  
  
  
  
  
  
  
  
  
        
  <br></br>
  <br></br>
  
  
  </center>
  
  <br></br>
  <br></br>
  
  
  
                      
                      
  
              <Router history={history}>
            <Switch>
              <Route path="/" exact>
                <div class="display-4 mb-1">Choose a route to go to</div>
                
              </Route>
              <Route path="/App">
                <App />
              </Route>
              
              
            </Switch>
          </Router>
  
          
          <div>
              
          </div>
  
  
  
  
  
  
  
  
      
  
  
  
      
        
        </div>      
    );
  }
  
  export default Vault;

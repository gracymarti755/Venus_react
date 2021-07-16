import React, { useState,useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import App from "./App";
import Alchemist from "./Alchemistabi";
import basetoken from "./borrow";
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
    // var [tid2,setId2] = useState([]);
  
    // // var [tid3,setId3] = useState([]);
    // let r = [];
   const bal = async () => {
 
      const accounts =  await web3.eth.getAccounts();
      var totaldeposit = await Alchemist.methods.getCdpTotalDeposited(accounts[0]).call();
      setTotaldeposit(totaldeposit);
      var totaldebited = await Alchemist.methods.getCdpTotalDebt(accounts[0]).call();
      setTotaldebt(totaldebited);
      setAvalwithdraw(totaldep - totaldebt);
      
      setAvalborrow(((totaldep * 50)/100) - totaldebt);
      setbalance(await basetoken.methods.balanceOf(accounts[0]).call());
    
   }
  //  alert(tid3[1]);
   useEffect(()=>{bal()},[totaldep,totaldebt,avalwithdraw])
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
  const liquidate = async(event) => {
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    
    var val = tid4 * 1000000000;
    var value = val + "000000000"
    await Alchemist.methods.liquidate(value).send({from:accounts[0]});
    alert("liquidate succesfully")
    bal()
  }
        
   
    
  
    return (    
  
      <div className="App">
  
  
  <h1>Vault</h1>
  
  
  
  <button
                  class="btn btn-info btn-block"
                  type="button"
                  onClick={() => {
                    history.push("/");
                  }}>
                  Go Home Page 
                </button>
  
  
                <br></br>
  <br></br>
  
  
        
  <center>
  <br></br>
  
  
          <form onSubmit ={bal} id="create-course-form" >
     
       
      </form>
  
     
      <br /> 
     
  <Popup trigger={<button class="btn btn-primary " > Deposit</button>} position="bottom center"><br />
    <div class="text-white bg-dark">Enter the amount you want to Deposit</div>
    <input type = "number" name="tid" required onChange={event => setId( event.target.value)} />
    <button class="btn btn-primary" onClick = {deposit} >Confirm</button>
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

{/* <label >Select a token to repay:</label>
<select id = "cars" >
  <option value="volvo">Token1</option>
  <option value="saab">Token2</option>
  
</select> */}
    <div class="text-white bg-dark">Enter the amount you want to Repay Borrow</div>
    <input type = "number"  name="tid3" required onChange={event => setId3( event.target.value)} />
    <button class="btn btn-primary" onClick={repayborrow} >Confirm</button>
    </Popup>
    &nbsp;
      <Popup trigger={<button class="btn btn-primary">  Liquidate</button>} position="bottom center"><br />
    <div class="text-white bg-dark">Enter the amount you want to Repay Borrow by liquidating your collateral</div>
    <input type = "number"  name="tid4" required onChange={event => setId4( event.target.value)} />
    <button class="btn btn-primary" onClick = {liquidate}>Confirm</button>
    </Popup>
    <br></br>
  <br></br> <br></br>
  <br></br>


  <text>Total deposited    :   &nbsp;{ parseFloat(totaldep/100000000000000000).toFixed(18)}</text> <br></br>
  <br></br>
  <text>Total debt         :  &nbsp;{parseFloat(totaldebt/100000000000000000).toFixed(18)}</text> <br></br>
  <br></br>
  <text>Availbe to withdraw:  &nbsp;{parseFloat(avalwithdraw/1000000000000000000).toFixed(18)}</text> <br></br>
  <br></br>
  <text>Available to borrow:  &nbsp;{parseFloat(avalwithdraw/1000000000000000000).toFixed(18)}</text><br></br> 
  <br></br>
  <text>Balance of Token   :  &nbsp;{parseFloat(balance/1000000000000000000).toFixed(18)}</text><br></br>  
  
  
  
  
  
  
  
  
        
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

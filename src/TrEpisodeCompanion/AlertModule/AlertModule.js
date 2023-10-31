import React, { Component } from "react";
import "./AlertModule.css";
import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import {dbStatic}from '../../firebase';
import { useEffect, useState } from 'react';
import Modal2 from '../../Containers/Modal2/Modal2';

const AlertModule = ()=>{
    const [alertMsg,setAlertMsg] = useState();
    const [showModal,setShowModal] = useState();

    useEffect(()=>{
        onSnapshot(collection(dbStatic,"TRalerts"), (snapshot)=>{
            setAlertMsg(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
            setShowModal(true);
        })
    },[])
    let alArr = 'null';
    let alDisp = null;
    let alSym = <ion-icon name="warning-outline"></ion-icon>;

    if(alertMsg){
        alArr = alertMsg[0].message.split('#');
        alDisp = <div className="AlertModContainer">
                    <div className="AlertSymb">
                        <h3 className="DangerAlert">{alSym}</h3>
                    </div>
                    {alertMsg[0].message}</div>;
    }
    if(alArr[0]==='killer'){
        alSym = <ion-icon name="skull-outline"></ion-icon>;
        alDisp = <div className="AlertModContainer">
                    <div className="AlertSymb">
                        <h3 className="DangerAlert">{alSym}</h3> 
                    </div>
                    <div className="AlertDisp">
                    <h4 className="AlertMainText">Killer will Kill</h4>   
                    <h5 className="AlertSubText">{alArr[1]}</h5>
                    <div className="AlertDescription">
                       -- SCORE {alArr[2]} pts --
                       <br/>
                       <p style={{fontWeight: 'lighter',width:'100%',color:'white'}}>
                            Reach the marked Zone fast<br/>
                            Place Your Bet with TR Coins<br/>
                            After The Zone's Countdown ends<br/>
                            Highest bidder will get Bonus Riddle
                       </p>
                    </div>
                    </div>
                </div>
    }
    else if(alArr[0]==='betting'){
        alSym = <ion-icon name="cash-outline"></ion-icon>
        alDisp = <div className="AlertModContainer">

                    <div className="AlertSymb">
                        <h3 className="DangerAlert">{alSym}</h3> 
                    </div>
                    <div className="AlertDisp">
                    <h4 className="AlertMainText">Bet The Best</h4>   
                    <h5 className="AlertSubText">{alArr[1]}</h5>
                    <div className="AlertDescription">
                       -- SCORE {alArr[2]} pts --
                       <br/>
                       <p style={{fontWeight: 'lighter',width:'100%'}}>
                            Reach the marked Zone fast<br/>
                            Place Your Bet with TR Coins<br/>
                            After The Zone's Countdown ends<br/>
                            Highest bidder will get Bonus Riddle
                       </p>
                    </div>
                    </div>
                </div>
    }
    else if(alArr.length===1){
        alDisp = <div className="AlertModContainer">

                    <div className="AlertSymb">
                        <h3 className="DangerAlert">{alSym}</h3> 
                    </div>
                    <div className="AlertDisp">
                    <h4 className="AlertMainText">Alert</h4>   
                    <h5 className="AlertSubText">{alArr[1]}</h5>
                    <div style={{fontWeight:"600",fontSize:"1.2rem"}} className="AlertDescription">
                       -- INFORMATION --
                       <br/>
                       <p style={{fontWeight: 'lighter',width:'100%',fontWeight:'400',fontSize:"1rem"}}>
                            {alArr[0]}
                       </p>
                    </div>
                    </div>
                </div>
    }
    return(
        <div>
            {alertMsg?
            <Modal2 show={showModal} onBackDrop = {()=>setShowModal(false)}>
                {alDisp}
            </Modal2>:null}
        </div>
    );
}

export default AlertModule;
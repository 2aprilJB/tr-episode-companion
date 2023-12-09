import React, { Component } from "react";
import "./AlertModule.css";
import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import {dbStatic}from '../../firebase';
import { useEffect, useState } from 'react';
import Modal3 from '../../Containers/Modal3/Modal3';
import Modal2 from '../../Containers/Modal2/Modal2';
import Countdown from "../../Assets/CountDown/CountDown";
import { updateAlertMsg } from "../../FireStoreUtils/FireStoreUtils";
import PlayzonePopup from "./PlayzonePopup/PlayzonePopup";

const AlertModule = (props)=>{
    const [alertMsg,setAlertMsg] = useState();
    const [showModal,setShowModal] = useState();
    const [popMsg,setPopMsg] = useState();
    const [showPop,setShowPop] = useState();
    let tempSnap = null;
    let tempSnap2 = null;
    useEffect(()=>{
        setShowPop(false);
        onSnapshot(collection(dbStatic,"TRalerts"), (snapshot)=>{
            tempSnap = snapshot.docs.map(doc=>({...doc.data(), id:doc.id}));
            setAlertMsg(tempSnap);
            props.setAlertState(tempSnap[0].message.split('#'));
            setShowModal(true);
        })
        onSnapshot(collection(dbStatic,"TRpops"), (snapshot)=>{
            tempSnap2 = snapshot.docs.map(doc=>({...doc.data(), id:doc.id}));
            setPopMsg(tempSnap2);
            setShowPop(true);
        })
    },[])


    let killerTimesUp = ()=>{
        updateAlertMsg("Time is up, no one stopped Killer. Now Danger zones Activating in 5 seconds reach Safe zones.");
    }



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
    if(alArr[0]==='killer'){      //"killer # character # rewardPts # timeRef # duration"
        alSym = <ion-icon name="skull-outline"></ion-icon>;
        alDisp =<div className="AlertModContainer">
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
                                        Stop Killer before he<br/>
                                        Reaches the character's zone<br/>
                                        If Killer reaches character<br/>
                                        Danger Zone will be activated
                                </p>
                            </div>
                    </div>
                    {alArr.length>3?<div className="AlertModuleCountdown"><Countdown color = {["#3081D0","#AF2655"]} options = {{refTime:alArr[3],duration:alArr[4]}} timesUpAction = {killerTimesUp}  /></div>:null}
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
    else if(alArr[0]==='calm'){
        alDisp = <div className="AlertModContainer">

                    <div className="AlertSymb">
                        <h3 className="DangerAlert">{alSym}</h3> 
                    </div>
                    <div className="AlertDisp">
                    <h4 className="AlertMainText">Alert</h4>   
                    <h5 className="AlertSubText">{alArr[1]}</h5>
                    <div style={{color: "#D2DE32",fontWeight:"600",fontSize:"1.2rem"}} className="AlertDescription">
                       -- INFORMATION --
                       <br/>
                       <p style={{color: "yellow",fontWeight: 'lighter',width:'100%',fontWeight:'400',fontSize:"1rem"}}>
                            Everything is Calm, Keep checking for Alerts
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
            {showPop?popMsg[0].message!=="calm"?
                <Modal3 top = {true} noCross show = {showPop} onBackDrop = {()=>{setShowPop(false)}}>
                    <PlayzonePopup duration = {2} playPopMsg = {popMsg[0].message} />
                </Modal3>
            :null:null}
            {props.display?alertMsg?
            <Modal2 noCross = {props.noCross} show={showModal} onBackDrop = {()=>setShowModal(false)}>
                {alDisp}
            </Modal2>:null:null}
        </div>
    );
}

export default AlertModule;
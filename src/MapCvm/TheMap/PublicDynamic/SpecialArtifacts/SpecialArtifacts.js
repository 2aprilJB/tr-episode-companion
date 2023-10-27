import React, { Fragment, useEffect, useState } from "react";
import "./SpecialArtifacts.css";
import { iconVartifacts } from "../../Icon/Icon";
import { Circle, Marker } from "react-leaflet";
import TiltCodeGen from "./TiltCodeGen/TiltCodeGen";
import Modal2 from "../../../../Containers/Modal2/Modal2";
import GuessNumGen from "./GuessNumGen/GuessNumGen";

const SpecialArtifacts = (props)=>{
    const [showModal,setShowModal] = useState(); //Only For showModal that's going to pop when when specaialArtifactZone is stepped on
    useEffect(()=>{
        setShowModal(true)
    },[])

    let acProxyArr = props.activeProxyZone.split("#"); //if ActiveProxyZone is somethingLike this : "23#1#NowWillComeCode" it will become
    let guessNum = 0;                                  // --> ["23","1","NowWillComeCode"];
    let guessRange = 100;                              // --> ["guessNum","guessRangeLevel","LaterCode"];
    if(acProxyArr.length>1){
        guessNum = Number(acProxyArr[0]);
        guessRange = Number(acProxyArr[1])*100;
    }
    else{}
    return(
    <div>
    {props.vArtifacts?props.vArtifacts.map((ele,ind)=>{
            if(!ele.validated){
                return <div key={ind}>
                    <Circle weight= {ele.proxyZone[1].weight} radius={ele.proxyZone[1].radius} fillColor={ele.proxyZone[1].color} color={ele.proxyZone[1].boundColor} center={ele.coords} />
                    {/* <Marker eventHandlers={{click: (e)=>{alert(ele.idArtifact)}}} position={ele.coords} icon={iconVartifacts}/> */} {/* This Cross icon marker was removed as it was forcing too much rendering */}
                </div>;
            }
            else{}
        }):null}
        
        {props.activeProxyZone.length>9?<Modal2 noCross = {true} show = {showModal} onBackDrop = {()=>setShowModal(false)}>
            <div className="SpecialArtifactModalContainer">
            {guessNum===0?
                <div className="TiltCodeModalContainer">
                    <h3 className="ChitTypeHeading">Code Appeared</h3>
                    <h3>To read the Code tilt Phone</h3>
                    <TiltCodeGen horiCode = {props.activeProxyZone} />   
                </div>
            :
                <GuessNumGen correctResult = {props.activeProxyZone} num = {guessNum} range = {guessRange} />
            }
            </div>
            </Modal2>:null}
    
    </div>
    )
}

export default SpecialArtifacts;
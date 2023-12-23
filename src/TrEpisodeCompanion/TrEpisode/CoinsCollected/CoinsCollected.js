import {dbTeams} from '../../../firebase';
import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import React, { Component, useEffect, useState } from "react";
import "./CoinsCollected.css";
import { getCoins } from "../../../FireStoreUtils/FireStoreUtils";
import axios from 'axios';

const CoinsCollected = (props)=>{
    // const getCoins = async(activeTeam)=>{
    //     const docRef = doc(db,"participantsCoords",activeTeam);
    //     const docSnap = await getDoc(docRef);
    //     if(docSnap.exists()){
    //         setCoins(docSnap.data().trCoins);
    //         console.log(docSnap.data())
    //     }
    //     else{
            
    //     }
    // }
    let fetchCoins = ()=>{
        axios.get(props.baseUrl.dynamicBase4 + '.json')
             .then(resp=>{
                let allCoins = resp.data.backUpTrCoins;
                allCoins.map((ele,ind)=>{
                    if(ele[0]===props.activeTeam){
                        props.updateCoinState([ind,ele[1]])
                    }
                    else{}
                })
             })
             .catch(err=>{
                console.log(err);
                alert('Network issue');
             })
    }
    useEffect(()=>{

        //Below method is used when data is being stored in firestore 

        // if(dbTeams[props.activeTeam]){               
        //     onSnapshot(collection(dbTeams[props.activeTeam],"TrCoins"), (snapshot)=>{
        //         let allCoins = snapshot.docs.map(doc=>({...doc.data(), id:doc.id}));
        //         allCoins.map(ele=>{
        //             if(ele.id===props.activeTeam){
        //                 if(ele.trCoins){
        //                     props.updateCoinState(ele.trCoins)
        //                     // setCoins(ele.trCoins);//Updating server
        //                 }
        //                 else{
        //                     props.updateCoinState(0)
        //                     // setCoins(0);
        //                 }
        //             }
        //             else{}
        //         })
        //     })
        // }
        // else{}

        //Below method is ought to be used when data is being store in rtdb
        fetchCoins();
        
    },[])

    return(
        
        <div onClick={()=>{fetchCoins()}} className="CoinsContainer">
            <div className="CoinContainer"><ion-icon name="logo-bitcoin"></ion-icon></div>
            <div className="CoinCount">{props.stateCoins[1]}</div>
        </div>
    );
}

export default CoinsCollected;
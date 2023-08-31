import db from '../../../firebase';
import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import React, { Component, useEffect, useState } from "react";
import "./CoinsCollected.css";
import { getCoins } from "../../../FireStoreUtils/FireStoreUtils";

const CoinsCollected = (props)=>{
    const [coins,setCoins] = useState();         //Storing static Polygon Coordinates  
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

    useEffect(()=>{
        onSnapshot(collection(db,"participantsCoords"), (snapshot)=>{
            let allCoins = snapshot.docs.map(doc=>({...doc.data(), id:doc.id}));
            allCoins.map(ele=>{
                if(ele.id===props.activeTeam){
                    if(ele.trCoins){
                        props.updateCoinState(ele.trCoins)
                        setCoins(ele.trCoins);
                    }
                    else{
                        props.updateCoinState(0)
                        setCoins(0);
                    }
                }
                else{}
            })
        })
    },[])

    return(
        
        <div className="CoinsContainer">
            <div className="CoinContainer"><ion-icon name="logo-bitcoin"></ion-icon></div>
            <div className="CoinCount">{coins?coins:null}</div>
        </div>
    );
}

export default CoinsCollected;
import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import db from '../firebase';   
import axios from 'axios';
//activeTeam: 'string'
//coordsArr: [lat,lng]
//charCodes: [['charCode','charName'],...]

export const updateActiveTeamCoords = async(activeTeam,coordsArr,charCodes)=>{
    let collectionName = '';
    let charName = ''        
    if(activeTeam.split("").length!==1)     //If Active team is a character then team zode would be 
        collectionName = "characterCoords"; //something like this: 'Z2' which's a string of length 2
    else                                    //so will change collection where we are to push coords payload
        collectionName = "participantsCoords"
    
    charCodes.map(ele=>{
        if(ele[0]===activeTeam)
            charName = ele[1]
        else{}
    })

    const docRef = doc(db,collectionName,activeTeam);
    const docSnap = await getDoc(docRef);
    const payload = {...docSnap.data(),coords:coordsArr,characterName:charName,id:docRef.id};
    await setDoc(docRef,payload);
}

export const updateAlertMsg = async(msg)=>{
    const docRef = doc(db,"TRalerts","mainMsg");
    const payload = {message: msg};
    await setDoc(docRef,payload);
}


export const updateCoins = async(activeTeam,updatedCoins)=>{
    const docRef = doc(db,"participantsCoords",activeTeam);
    const docSnap = await getDoc(docRef);
    const payload = {...docSnap.data(),trCoins:updatedCoins};
    await setDoc(docRef,payload);
}


export const popUpAlertMsg = async()=>{
    const docRef = doc(db,"TRalerts","mainMsg");
    const docSnap = await getDoc(docRef);
    let msg = docSnap.data();
    console.log(msg);
}
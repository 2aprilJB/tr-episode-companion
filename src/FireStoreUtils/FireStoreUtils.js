import { collection, doc, onSnapshot, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import {db,dbDynamic4,dbDynamic1,dbStatic,dbTeams,dbDynamic5} from '../firebase';   
import axios from 'axios';
//activeTeam: 'string'
//coordsArr: [lat,lng]
//charCodes: [['charCode','charName'],...]

//-----TR-CompanionSupport-01,02

export const updateActiveTeamCoords = async(activeTeam,coordsArr,charCodes)=>{
    if(dbTeams[activeTeam]){
        let collectionName = '';
        let charName = ''        
        if(activeTeam.split("").length!==1)     //If Active team is a character then team zode would be 
            collectionName = "characterCoords"; //something like this: 'Z2' which's a string of length 2
        else                                    //so will change collection where we are to push coords payload
            collectionName = "CoordsNcoins"
        
        charCodes.map(ele=>{
            if(ele[0]===activeTeam)
                charName = ele[1]
            else{}
        })
        const docRef = doc(dbTeams[activeTeam],collectionName,activeTeam);
        const docSnap = await getDoc(docRef);
        const payload = {...docSnap.data(),coords:coordsArr,characterName:charName,id:docRef.id};
        await setDoc(docRef,payload);
    }
    else{
    }
}


export const updateCoins = async(activeTeam,updatedCoins)=>{
    if(dbTeams[activeTeam]){
        const docRef = doc(dbTeams[activeTeam],"TrCoins",activeTeam);
        const docSnap = await getDoc(docRef);
        const payload = {...docSnap.data(),trCoins:updatedCoins};
        await setDoc(docRef,payload);
    }
}
//************************************************************************************ */
//------TR-DynamicBase-1
export const updateDangerZone = async(activeTeam,tOf)=>{
    const docRef = doc(dbDynamic1,activeTeam,"dangerZoneActivation");
    const docSnap = await getDoc(docRef);
    const payload = {...docSnap.data(),activate:tOf};
    await setDoc(docRef,payload);
}
export const isItDanger = async(activeTeam)=>{
    const docRef = doc(dbDynamic1,activeTeam,"dangerZoneActivation");
    const docSnap = await getDoc(docRef);
    const payload = {...docSnap.data()};
    return payload;
}

//------TR-DynamicBase-4

//Special Artifacts---

//Adding on Map
export const addArtifactToFs = async(coordsArr,artifactCode,idArtifact)=>{
    const docRef = doc(dbDynamic4,"vArtifacts",artifactCode);
    const docSnap = await getDoc(docRef);
    const payload = {...docSnap.data(),coords:coordsArr[0],validated:coordsArr[1],idArtifact:idArtifact,proxyZone:[docRef.id,{boundColor:'white',color:'white',radius:2,weight:2}]};
    await setDoc(docRef,payload);
}
//Updating validation to true
export const updateArtifactToFs = async(artifactCode)=>{
    const docRef = doc(dbDynamic4,'vArtifacts',artifactCode);
    const docSnap = await getDoc(docRef);
    const payload = {...docSnap.data(),validated:true};
    await setDoc(docRef,payload);
}
//Deleting Artifact
export const deleteArtifactFromFs = async(artifactCode)=>{
    const docRef = doc(dbDynamic4,'vArtifacts',artifactCode);
    await deleteDoc(docRef);
}
//------TR-DynamicBase-5

//Signal for Send Coords from Participants Devices

export const sendCoordsSignal = async(hideArtifacts)=>{
    let randomNum = hideArtifacts?hideArtifacts:Math.floor(Math.random()*1000); //Snapshot signal on every participant Device so it can react by sendimg its live location
    const docRef = doc(dbDynamic5,"sendCoords","fromParticipants");
    const docSnap = await getDoc(docRef);
    const payload  = {...docSnap.data(),sendOrNot: randomNum};    //Here we want any random number to be updated so we can get 
    await setDoc(docRef,payload);
}

//************************************************************************************ */

//------TR-StaticBase

export const updateAlertMsg = async(msg)=>{
    const docRef = doc(dbStatic,"TRalerts","mainMsg");
    const payload = {message: msg};
    await setDoc(docRef,payload);
}
//************************************************************************************ */


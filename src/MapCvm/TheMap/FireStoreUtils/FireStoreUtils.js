import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import db from '../../../firebase';
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
    const payload = {coords:coordsArr,characterName:charName,id:docRef.id};
    await setDoc(docRef,payload);
}

// export const updateSpecialZones = async()=>{
//     const docRef = doc(db,"specialZones","dungeon");
//     const payload = {coords:"[[23.23673,72.65143], [23.23468,72.65108], [23.2361,72.65314]]"};
//     await setDoc(docRef,payload)
// }
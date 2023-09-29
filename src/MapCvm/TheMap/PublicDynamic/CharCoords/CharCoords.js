import React from "react";
import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import {db,dbDynamic1, dbDynamic4, dbTeams} from '../../../../firebase';
import { useEffect, useState } from 'react';
import "./CharCoords.css";
import { Marker } from "react-leaflet";
import {  iconPerson, iconChar,iconChar1,iconChar2,iconChar3,iconChar4,iconChar5,iconKiller1,iconKiller2,iconManager, iconSpecial  } from '../../Icon/Icon';


const CharCoords = (props)=>{
    const [charZ0,setCharZ0] = useState();
    const [charZ1,setCharZ1] = useState();
    const [charZ2,setCharZ2] = useState();
    const [charZ3,setCharZ3] = useState();
    const [charZ4,setCharZ4] = useState();
    const [charZ5,setCharZ5] = useState();
    const [charZ6,setCharZ6] = useState();
    const [charZ7,setCharZ7] = useState();
    let charCodesArr = [['Z0',setCharZ0],['Z1',setCharZ1],['Z2',setCharZ2],['Z3',setCharZ3],['Z4',setCharZ4],['Z5',setCharZ5],['Z6',setCharZ6],['Z7',setCharZ7]]

    useEffect(()=>{
        charCodesArr.map(ele=>{
            if(ele[0]!=props.activeTeam)
                onSnapshot(collection(dbTeams[ele[0]],"characterCoords"),(snapshot)=>{
                    ele[1](snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
                })
            else{
            }
        })

    },[])

    return(
        <div>
            {charZ0?<Marker position={charZ0[0].coords} eventHandlers={{click: (e)=>{alert(charZ0[0].characterName)}}} icon={iconManager} />:null}
            {charZ1?<Marker position={charZ1[0].coords} eventHandlers={{click: (e)=>{alert(charZ1[0].characterName)}}} icon={iconChar1} />:null}
            {charZ2?<Marker position={charZ2[0].coords} eventHandlers={{click: (e)=>{alert(charZ2[0].characterName)}}} icon={iconChar2} />:null}
            {charZ3?<Marker position={charZ3[0].coords} eventHandlers={{click: (e)=>{alert(charZ3[0].characterName)}}} icon={iconChar3} />:null}
            {charZ4?<Marker position={charZ4[0].coords} eventHandlers={{click: (e)=>{alert(charZ4[0].characterName)}}} icon={iconChar4} />:null}
            {charZ5?<Marker position={charZ5[0].coords} eventHandlers={{click: (e)=>{alert(charZ5[0].characterName)}}} icon={iconChar5} />:null}
            {charZ6?<Marker position={charZ6[0].coords} eventHandlers={{click: (e)=>{alert(charZ6[0].characterName)}}} icon={iconKiller1} />:null}
            {charZ7?<Marker position={charZ7[0].coords} eventHandlers={{click: (e)=>{alert(charZ7[0].characterName)}}} icon={iconKiller2} />:null}
        </div>
    );
}

export default CharCoords;


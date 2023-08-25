import { collection, onSnapshot } from 'firebase/firestore';
import db from '../../../firebase';
import { useEffect, useState } from 'react';
import React from 'react';
import { Marker } from 'react-leaflet';
import {  iconPerson, iconChar, iconSpecial  } from '../Icon/Icon';

const PublicMarkers = (props)=>{
    const [charCoords,setCharCoords] = useState();         //Storing Character Coordinates
    const [specialCoords,setSpecialCoords] = useState();   //Storing Special Coordinates
    let activeCoords = props.activeTeamCoords;
    useEffect(()=>{

        onSnapshot(collection(db,"characterCoords"), (snapshot)=>{
            setCharCoords(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
        })
        onSnapshot(collection(db,"specialCoords"), (snapshot)=>{
            setSpecialCoords(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
        })
    },[])
    

    return(
        <div className="PublicMarkersContainer">
            {charCoords?charCoords.map(ele=>{
                let problemIcon = null;
                if(ele.id===props.activeTeam){
                    problemIcon = iconPerson;
                }
                else{
                    problemIcon = iconChar;             //Till this part we have solved problem
                }                                       //Where when character becomes active icon should be of activePerson 
                return(
                    <Marker key={ele.id} eventHandlers={{
                        click: (e)=>{console.log(ele.characterName)}
                    }} position = {ele.coords} icon={problemIcon}></Marker>
                )
            }):null}
            {specialCoords?specialCoords.map(ele=>{
                return(
                    <Marker key={ele.id} position = {ele.coords} icon={iconSpecial}></Marker>
                )
            }):null}
            <Marker position={activeCoords} icon={iconPerson}></Marker>
        </div>
    );
}

export default PublicMarkers;
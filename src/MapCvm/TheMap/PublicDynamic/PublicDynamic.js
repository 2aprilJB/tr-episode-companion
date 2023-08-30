import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import db from '../../../firebase';
import { useEffect, useState } from 'react';
import React from 'react';
import { Marker, Polygon, Polyline } from 'react-leaflet';
import {  iconPerson, iconChar, iconSpecial  } from '../Icon/Icon';
import axios from 'axios';

const PublicMarkers = (props)=>{

    let polyProps = {
        color: 'red',
        weight: 1
    }
    
    const [polyCoords,setPolyCoords] = useState();         //Storing static Polygon Coordinates  
    const [charCoords,setCharCoords] = useState();         //Storing Character Coordinates
    const [specialCoords,setSpecialCoords] = useState();   //Storing Special Coordinates
    let activeCoords = props.activeTeamCoords;
    
    
    

    useEffect(()=>{

        axios.get(props.baseUrlPublicCoords + '.json')
            .then(resp=>{
                setPolyCoords(resp.data.polygons);
                
            })
            .catch(err=>{
                console.log(err);
                alert('Another Network error is on the verge to kill this app');
            })
        
            
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


            {polyCoords?<Polygon positions={polyCoords.outlineBoundary.polyCoords} pathOptions={polyCoords.outlineBoundary.polyOptions}></Polygon>:null}
            
            <Marker position={activeCoords} icon={iconPerson}></Marker>
        </div>
    );
}

export default PublicMarkers;
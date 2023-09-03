import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import db from '../../../firebase';
import { useEffect, useState } from 'react';
import React from 'react';
import { Circle, Marker, Polygon, Polyline } from 'react-leaflet';
import {  iconPerson, iconChar,iconChar1,iconChar2,iconChar3,iconChar4,iconChar5,iconKiller1,iconKiller2,iconManager, iconSpecial  } from '../Icon/Icon';
import axios from 'axios';

const PublicMarkers = (props)=>{

    let polyProps = {
        color: 'red',
        weight: 1
    }
    
    const [polyCoords,setPolyCoords] = useState();         //Storing static Polygon Coordinates  
    const [charCoords,setCharCoords] = useState();         //Storing Character Coordinates
    const [usersCoords,setUsersCoords] = useState();         //Storing users Coordinates
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
        onSnapshot(collection(db,"participantsCoords"), (snapshot)=>{
            setUsersCoords(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
        })
        onSnapshot(collection(db,"specialCoords"), (snapshot)=>{
            setSpecialCoords(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
        })
    },[])
    let showUsers = false;
    if(props.activeTeam==="Z0")
        showUsers = true;
    else{}

    return(
        <div className="PublicMarkersContainer">
            {/* All Characters Markers that are public and dynamic in nature, including Manager */}
            {charCoords?charCoords.map(ele=>{
                let problemIcon = null;
                if(ele.id===props.activeTeam){
                    problemIcon = iconPerson;
                }
                else if(ele.id==="Z0"){
                    problemIcon = iconManager;             //Till this part we have solved problem
                }
                else if(ele.id==="Z1"){
                    problemIcon = iconChar1;             //Till this part we have solved problem
                }
                else if(ele.id==="Z2"){
                    problemIcon = iconChar2;             //Till this part we have solved problem
                }
                else if(ele.id==="Z3"){
                    problemIcon = iconChar3;             //Till this part we have solved problem
                }
                else if(ele.id==="Z4"){
                    problemIcon = iconChar4;             //Till this part we have solved problem
                }
                else if(ele.id==="Z5"){
                    problemIcon = iconChar5;             //Till this part we have solved problem
                }  
                else if(ele.id==="Z6"){
                    problemIcon = iconKiller1;             //Till this part we have solved problem
                } 
                else if(ele.id==="Z7"){
                    problemIcon = iconKiller2;             //Till this part we have solved problem
                }                                      //Where when character becomes active icon should be of activePerson 
                return(
                    <Marker key={ele.id} eventHandlers={{
                        click: (e)=>{alert(ele.characterName)}
                    }} position = {ele.coords} icon={problemIcon}></Marker>
                )
            }):null}
            {/* Special Markers going to popup and dynamic in nature*/}
            {specialCoords?specialCoords.map(ele=>{
                return(
                    <Circle key={ele.id} center = {ele.coords} fillColor='Yellow' color='red' weight={1} opacity={10} radius={7}></Circle>
                )
            }):null}

            {showUsers?usersCoords?usersCoords.map(ele=>{
                return(
                    <Marker key={ele.id} position = {ele.coords} icon={iconChar}></Marker>
                )
            }):null:null}

            {/* All polygons that are public and Static in nature */}
            {polyCoords?<Polygon positions={polyCoords.outlineBoundary.polyCoords} pathOptions={polyCoords.outlineBoundary.polyOptions}></Polygon>:null}
            {polyCoords?polyCoords.charZones.map(ele=>{
                return(
                    <Polygon positions={ele[2]} pathOptions={ele[1]}/>
                )
            }):null}
            <Marker position={activeCoords} icon={iconPerson}></Marker>
        </div>
    );
}

export default PublicMarkers;
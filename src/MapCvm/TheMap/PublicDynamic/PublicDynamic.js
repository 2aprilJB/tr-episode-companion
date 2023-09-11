import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import {db,dbDynamic1, dbDynamic4, dbTeams} from '../../../firebase';
import { useEffect, useState } from 'react';
import React from 'react';
import { Circle, Marker, Polygon, Polyline } from 'react-leaflet';
import {  iconPerson, iconChar,iconChar1,iconChar2,iconChar3,iconChar4,iconChar5,iconKiller1,iconKiller2,iconManager, iconSpecial ,iconVartifacts } from '../Icon/Icon';
import axios from 'axios';
import CharCoords from './CharCoords/CharCoords';

const PublicMarkers = (props)=>{

    let polyProps = {
        color: 'red',
        weight: 1
    }
    
    const [vArtifacts,setVartifacts] = useState();
    const [polyCoords,setPolyCoords] = useState();         //Storing static Polygon Coordinates  
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
        
        onSnapshot(collection(dbDynamic4,"vArtifacts"), (snapshot)=>{
            setVartifacts(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})))
        })    
        // onSnapshot(collection(db,"characterCoords"), (snapshot)=>{
        //     setCharCoords(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
        // })
        onSnapshot(collection(db,"participantsCoords"), (snapshot)=>{
            setUsersCoords(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
        })
        onSnapshot(collection(dbDynamic1,"specialCoords"), (snapshot)=>{
            setSpecialCoords(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
        })

    },[])
    let showUsers = false;
    if(props.activeTeam==="Z0")
        showUsers = true;
    else{}

    return(
        <div className="PublicMarkersContainer">
            <CharCoords activeTeam = {props.activeTeam}/>

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
            {polyCoords?polyCoords.charZones.map((ele,ind)=>{
                return(
                    <Polygon key={ind} positions={ele[2]} pathOptions={ele[1]}/>
                )
            }):null}

            {vArtifacts?vArtifacts.map((ele,ind)=>{
                if(!ele.validated){
                    return <Marker key={ind} eventHandlers={{click: (e)=>{alert(ele.idArtifact)}}} position={ele.coords} icon={iconVartifacts}/>;
                }
                else{}
            }):null}

            {props.activeTeam.length<2?<Marker position={activeCoords} icon={iconPerson}></Marker>:null}
        </div>
    );
}

export default PublicMarkers;
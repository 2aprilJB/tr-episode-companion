import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import {db,dbDynamic1, dbDynamic4, dbTeams} from '../../../firebase';
import { useEffect, useState } from 'react';
import React from 'react';
import SpecialCoords from './SpecialCoords/SpecialCoords';
import CharZones from './CharZones/CharZones';
import ShowUserCoords from './ShowUserCoords/ShowUserCoords';
import SpecialArtifacts from './SpecialArtifacts/SpecialArtifacts';
import { Circle, Marker, Polygon, Polyline } from 'react-leaflet';
import {  iconPerson, iconChar,iconChar1,iconChar2,iconChar3,iconChar4,iconChar5,iconKiller1,iconKiller2,iconManager, iconSpecial ,iconVartifacts } from '../Icon/Icon';
import axios from 'axios';
import CharCoords from './CharCoords/CharCoords';
import CharProxies from './CharProximity/CharProxies';
import Modal from '../../../Containers/Modal/Modal';
// import { proxyCircleDetector } from '../../ProximityDetectors/ProximityDetectors';

const PublicMarkers = (props)=>{

    let polyProps = {
        color: 'red',
        weight: 1
    }
    
    const [vArtifacts,setVartifacts] = useState();
    const [polyCoords,setPolyCoords] = useState();         //Storing static Polygon Coordinates  
    const [usersCoords,setUsersCoords] = useState();         //Storing users Coordinates
    const [specCoords,setSpecCoords] = useState();   //Storing Special Coordinates
    const [showModal,setShowModal] = useState();
    let activeCoords = props.activeTeamCoords;
    
    
    

    useEffect(()=>{
        setShowModal(false);
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
        onSnapshot(collection(db,"participantsCoords"), (snapshot)=>{
            setUsersCoords(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
        })
        onSnapshot(collection(dbDynamic1,"specialCoords"), (snapshot)=>{
            setSpecCoords(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
        })

    },[])
    let showUsers = false;
    if(props.activeTeam==="Z0")
        showUsers = true;
    else{}


    // if(specCoords){
    //     specCoords.map(ele=>{
    //         if(proxyCircleDetector(activeCoords,ele.coords,7,showModal)){
    //             setShowModal(true);
    //         }
    //     })
    // }
    // else{}


    return(
        <div className="PublicMarkersContainer">
            <CharCoords activeCoords = {activeCoords} activeTeam = {props.activeTeam}/>

            {/* Special Markers going to popup and dynamic in nature*/}
            <SpecialCoords baseUrl = {props.baseUrls.dynamicBase3} activeCoords={activeCoords} specCoords = {specCoords} />
            {vArtifacts?<SpecialArtifacts vArtifacts = {vArtifacts} />:null}
            <ShowUserCoords showUsers = {showUsers} usersCoords = {usersCoords} />

            {/* All polygons that are public and Static in nature */}
            {polyCoords?<Polygon positions={polyCoords.outlineBoundary.polyCoords} pathOptions={polyCoords.outlineBoundary.polyOptions}></Polygon>:null}
            <CharZones activeCoords = {activeCoords} polyCoords = {polyCoords} />
            <CharProxies activeProxy = {props.activeProxy} modalBackDrop = {props.modalBackDrop} charProximityHandler = {props.charProximityHandler} setModal = {setShowModal} activeCoords = {activeCoords} baseUrl = {props.baseUrlPublicCoords} />
            

            {props.activeTeam.length===1||props.activeTeam.length===3?<Marker position={activeCoords} icon={iconPerson}></Marker>:null}
        </div>
    );
}

export default PublicMarkers;
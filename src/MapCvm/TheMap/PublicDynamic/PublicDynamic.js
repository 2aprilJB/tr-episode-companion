import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import {db,dbDynamic1, dbDynamic4, dbTeams, dbDynamic5} from '../../../firebase';
import { useEffect, useState, useMemo } from 'react';
import React from 'react';
import SpecialCoords from './SpecialCoords/SpecialCoords';
import CharZones from './CharZones/CharZones';
import ShowUserCoords from './ShowUserCoords/ShowUserCoords';
import SpecialArtifacts from './SpecialArtifacts/SpecialArtifacts';
import { Circle, Marker, Polygon, Polyline } from 'react-leaflet';
import {  iconPerson, iconChar,iconChar1,iconChar2,iconChar3,iconChar4,iconChar5,iconKiller1,iconKiller2,iconManager, iconSpecial ,iconVartifacts } from '../Icon/Icon';
import axios from 'axios';
import DangerZone from './DangerZone/DangerZone';
import CharCoords from './CharCoords/CharCoords';
import CharProxies from './CharProximity/CharProxies';
import Modal from '../../../Containers/Modal/Modal';
import proxyZone from '../../../TrEpisodeCompanion/ManagerMode/AddProxyZone/ShowProxyZones/ProxyZone/ProxyZone';
import { updateDangerZone } from '../../../FireStoreUtils/FireStoreUtils';
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
    const [shouldUpdatePublicCoords,setShouldUpdatePublicCoords] = useState();
    const [showModal,setShowModal] = useState();
    const [sendCoords,setSendCoords] = useState();   //To get Snapshot and make changes accordingly
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
        
        onSnapshot(collection(dbDynamic4,"vArtifacts"), (snapshot)=>{           //This Snapshot Listens to Dynamic Artifacts Changes
            setVartifacts(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
            setShouldUpdatePublicCoords(true);
        })    
        onSnapshot(collection(db,"participantsCoords"), (snapshot)=>{           //This Snapshot listens to Live Participants Coords, it will be legaciFied
            setUsersCoords(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
        })
        onSnapshot(collection(dbDynamic1,"specialCoords"), (snapshot)=>{        
            setSpecCoords(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
        })
        onSnapshot(collection(dbDynamic5,"sendCoords"), (snapshot)=>{   
            setSendCoords(true);
        })

    },[])
    let showUsers = false;
    if(props.activeTeam==="Z0")
        showUsers = true;
    else{}

    if(shouldUpdatePublicCoords){
        setShouldUpdatePublicCoords(false);
        axios.get(props.baseUrlPublicCoords + '.json')
         .then(resp=>{
            let newPublicCoords = resp.data;
            vArtifacts.map(ele=>{
                let temp = ele.proxyZone;

                if(ele.validated===false){
                    temp = [...temp,ele.coords];
                    newPublicCoords.polygons.charProxies.push(temp);
                }
                else{
                    props.activeProxyZoneHandler('');
                }
                // ele.proxyZone.push("Its a me AArio");
                // console.log(ele)
                    
            });
            props.setPublicCoordsForProxies(newPublicCoords);
        })
        .catch(err=>{
            console.log(err);
            alert('There is a Network Error')
        })
    }

    if(sendCoords)
        axios.put(props.baseUrls.dynamicBase5 + 'participantsCoords/' + props.activeTeam + '.json',activeCoords)
            .then(resp=>{
                setSendCoords(false)    //Setting back sendCoords to false that was set to True by Snapshot
                setShouldUpdatePublicCoords(true);   //So that Vartifacts Proxy can be updated
                axios.get(props.baseUrlPublicCoords + '.json')
                .then(resp=>{
                    setPolyCoords(resp.data.polygons);
                    props.setPublicCoordsForProxies(resp.data);
                })
                .catch(err=>{
                    console.log(err);
                    alert("Some network Error persists");
                })
                })
                .catch(err=>{
                    console.log(err);
                    alert("There's some serious Network error going on that even the developer can't deal with so bear with us cause he is onto some another toll!!")
                })
    else{}

    const eventHandlers = useMemo(() => ({
        dragend(e) {
          let draggedCoords = e.target.getLatLng();
          
          props.setDraggedCoords([draggedCoords.lat,draggedCoords.lng])
        },
      }),[])
    if(props.activeProxyZone!=='Danger'){
        updateDangerZone(props.activeTeam,false);
    }
    else{
        updateDangerZone(props.activeTeam,true);
    }
    return(
        <div className="PublicMarkersContainer">
            <CharCoords activeCoords = {activeCoords} activeTeam = {props.activeTeam}/>

            {/* Special Markers going to popup and dynamic in nature*/}
            <SpecialCoords baseUrl = {props.baseUrls.dynamicBase3} activeCoords={activeCoords} specCoords = {specCoords} />
            {vArtifacts?<SpecialArtifacts activeProxyZone = {props.activeProxyZone} vArtifacts = {vArtifacts} />:null}
            <DangerZone secondaryProxy = {props.secondaryProxy} dangerMinus = {2} baseUrls = {props.baseUrls} countDown = {6} activeTeam = {props.activeTeam} activeProxyZone = {props.activeProxyZone} />

            {/* <ShowUserCoords showUsers = {showUsers} usersCoords = {usersCoords} /> */}

            {/* All polygons that are public and Static in nature */}
            {polyCoords?<Polygon positions={polyCoords.outlineBoundary.polyCoords} pathOptions={polyCoords.outlineBoundary.polyOptions}></Polygon>:null}
            <CharZones activeCoords = {activeCoords} polyCoords = {polyCoords} />
            {polyCoords?<CharProxies polyCoords = {polyCoords} activeProxy = {props.activeProxy} modalBackDrop = {props.modalBackDrop} charProximityHandler = {props.charProximityHandler} setModal = {setShowModal} activeCoords = {activeCoords} />:null}
            
            <Marker position={activeCoords} icon={iconPerson}></Marker>
            {/* {props.activeTeam.length===1||props.activeTeam.length===3?<Marker position={activeCoords} icon={iconPerson}></Marker>:null} */}


            {props.activeTeam.length===2?<Marker position={props.draggedCoords} icon={iconChar} eventHandlers={eventHandlers} draggable={true} />:null}
        </div>
    );
}

export default PublicMarkers;
import React from 'react';
import firebase from 'firebase/compat/app';
import { MapContainer as LeafletMap, TileLayer, Polygon, Circle, Marker, Popup, ImageOverlay } from 'react-leaflet';
import {  iconPerson, iconChar  } from '../Icon/Icon';
import 'firebase/compat/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyD-bRZE3M4MRdkzk99sZhnpcOxwsiIu4zA",
    authDomain: "tr-episode-companion.firebaseapp.com",
    databaseURL: "https://tr-episode-companion-default-rtdb.firebaseio.com",
    projectId: "tr-episode-companion",
    storageBucket: "tr-episode-companion.appspot.com",
    messagingSenderId: "1031772893210",
    appId: "1:1031772893210:web:b1f97437603936b1f1a1a3",
    measurementId: "G-CDT4DV7F2Y"
})
const firestore = firebase.firestore();
function DynamicMarker(){
    const coordinatesRef = firestore.collection('characterCoords');
    const [coordinates] = useCollectionData(coordinatesRef);
    let mera = coordinates && coordinates.map(msg=>{
                console.log(msg.coords)
                return(
                    <Marker key={msg.id} position={msg.coords} icon={iconChar}></Marker>
                );
            })
    return(
        <div>
        {mera}
        </div>
    )
}

export default DynamicMarker;
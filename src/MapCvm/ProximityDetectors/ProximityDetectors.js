import React from "react";
import { isMarkerInsideCircle, isMarkerInsidePolygon } from "../TheMap/DynamicMarker/DynamicMarker";
import getDistance from "geolib/es/getPreciseDistance";

export const proxyZoneDetector = (activeCoords,proxyZonesCoords,currProxyZone,setProxyZoneCode)=>{
    proxyZonesCoords.map((ele,ind)=>{
        if(isMarkerInsidePolygon(activeCoords,ele[2])){
            setProxyZoneCode(ele[0]);
        }
        else{
            if(currProxyZone===ele[0]){
                setProxyZoneCode('')
            }
            else{}
        }
    })
}

// export const proxyCircleDetector = (activeCoords,proxyZoneCoords,radius,isItIn)=>{
//     proxyZoneCoords.map(ele=>{
//         isMarkerInsideCircle(activeCoords,ele[2],8)
//     })
// }
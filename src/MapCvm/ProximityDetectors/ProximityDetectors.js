import React from "react";
import { isMarkerInsideCircle, isMarkerInsidePolygon } from "../TheMap/DynamicMarker/DynamicMarker";
import getDistance from "geolib/es/getPreciseDistance";

//When a Circle is the Concern and we have Center and 

export const proxyZoneDetector = (activeCoords,proxyZonesCoords,currProxyZone,setProxyZoneCode,currSecondaryProxy,setSecondaryProxy)=>{
    proxyZonesCoords.map((ele,ind)=>{
        if(ele[0]!=='Z0'){
            if(isMarkerInsideCircle(activeCoords,ele[2],ele[1].radius)){
                if(currProxyZone===''||currProxyZone===ele[0])
                    setProxyZoneCode(ele[0]);
                else{
                    setSecondaryProxy(ele[0]);
                }
            }
            else{
                if(currProxyZone===ele[0]){
                    setProxyZoneCode('');
                }
                else{}
                if(currSecondaryProxy===ele[0]){
                    setSecondaryProxy('');
                }
                else{}
            }
        }
    })
}
//When a Polygon is the Concern

// export const proxyZoneDetector = (activeCoords,proxyZonesCoords,currProxyZone,setProxyZoneCode)=>{
//     proxyZonesCoords.map((ele,ind)=>{
//         if(isMarkerInsidePolygon(activeCoords,ele[2])){
//             setProxyZoneCode(ele[0]);
//         }
//         else{
//             if(currProxyZone===ele[0]){
//                 setProxyZoneCode('')
//             }
//             else{}
//         }
//     })
// }

// export const proxyCircleDetector = (activeCoords,proxyZoneCoords,radius,isItIn)=>{
//     proxyZoneCoords.map(ele=>{
//         isMarkerInsideCircle(activeCoords,ele[2],8)
//     })
// // }
//             if(isMarkerInsideCircle(activeCoords,ele[2],ele[1].radius)){
//                 setProxyZoneCode(ele[0]);
//             }
//             else{
//                 if(currProxyZone===ele[0]){
//                     setProxyZoneCode('');
//                 }
//                 else{}
//             }
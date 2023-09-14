import React from "react";
import "./CharZones.css"
import { Polygon } from "react-leaflet";
// import { isMarkerInsidePolygon } from "../../DynamicMarker/DynamicMarker";


const charZones = (props)=>{
    
    return(
        <div>
            {
                props.polyCoords?props.polyCoords.charZones.map((ele,ind)=>{
                // let isInsideZone = isMarkerInsidePolygon(props.activeCoords,ele[2])
                // if(isInsideZone)
                //     console.log('You are in the Zone of: ' + ele[0]);
                return(
                    <Polygon key={ind} positions={ele[2]} pathOptions={ele[1]}/>
                )
                }):null
        }
        </div>
    );
    
}

export default charZones;
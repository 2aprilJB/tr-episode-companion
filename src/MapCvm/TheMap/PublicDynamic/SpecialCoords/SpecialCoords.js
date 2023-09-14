import React from "react";
import "./SpecialCoords.css"
import { Circle } from "react-leaflet";
import { proxyCircleDetector } from "../../../ProximityDetectors/ProximityDetectors";


const specialCoords = (props)=>{
    return(
        <div>
            {props.specCoords?props.specCoords.map(ele=>{
                // proxyCircleDetector(props.activeCoords,ele.coords,7)
                return(
                    <Circle key={ele.id} center = {ele.coords} fillColor='Yellow' color='red' weight={1} opacity={10} radius={7}></Circle>
                )
                }):null}
        </div>)
}

export default specialCoords;
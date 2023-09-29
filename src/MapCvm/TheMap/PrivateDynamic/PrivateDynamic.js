import React, { Fragment } from "react";
import { Marker } from "react-leaflet";
import { iconSpecial } from "../Icon/Icon";

const privateDynamic = (props)=>{
    let allCoords = props.allCoords;
    return(
        <Fragment>
            {Object.keys(allCoords).map(ele=>{
                if(ele!=='Z0'){
                    return <Marker key={ele} eventHandlers={{click: (e)=>{alert(ele)}}}  position={allCoords[ele]} icon={iconSpecial}></Marker>
                }
                else{}
            })}
        </Fragment>
    );
}
export default privateDynamic
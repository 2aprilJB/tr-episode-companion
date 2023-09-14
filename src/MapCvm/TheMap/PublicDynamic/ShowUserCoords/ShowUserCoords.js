import React from "react";
import { Marker } from "react-leaflet";
import "./ShowUserCoords.css";
import { iconChar } from "../../Icon/Icon";

const showUserCoords = (props)=>{
    return(
        <div>
            {props.showUsers?props.usersCoords?props.usersCoords.map(ele=>{
                return(
                    <Marker key={ele.id} position = {ele.coords} icon={iconChar}></Marker>
                )
            }):null:null}
        </div>
    );
    
}

export default showUserCoords;
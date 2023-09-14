import React from "react";
import "./SpecialArtifacts.css";
import { iconVartifacts } from "../../Icon/Icon";
import { Marker } from "react-leaflet";

const specialArtifacts = (props)=>{
    return(
    <div>
    {props.vArtifacts?props.vArtifacts.map((ele,ind)=>{
            if(!ele.validated){
                return <Marker key={ind} eventHandlers={{click: (e)=>{alert(ele.idArtifact)}}} position={ele.coords} icon={iconVartifacts}/>;
            }
            else{}
        }):null}
    </div>
    )
}

export default specialArtifacts;
import React from "react";
import './ProxyZone.css';

const proxyZone = (props)=>{
    return(
        <div className="SpecArtifactContainer">
            <button onClick={props.onDeleteHandler} className="DeleteArtifact"><ion-icon name="trash-outline"></ion-icon></button>
            <h5>Zone-Code: </h5><h4 className="SpecArtifactDet">{props.proxyZoneDet[0]}</h4>
            <h3>Fill-Color: </h3><h4 className="SpecArtifactDet">{props.proxyZoneDet[1].color}</h4>
        </div>
    );
}

export default proxyZone;
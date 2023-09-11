import React from "react";
import './SpecArtifact.css';

const specArtifact = (props)=>{
    return(
        <div className="SpecArtifactContainer">
            <button onClick={props.onDeleteHandler} className="DeleteArtifact"><ion-icon name="trash-outline"></ion-icon></button>
            <h5>Code: </h5><h4 className="SpecArtifactDet">{props.artifactCode}</h4>
            <h3>Found by Team: </h3><h4 className="SpecArtifactDet">{props.foundBy}</h4>
        </div>
    );
}

export default specArtifact;
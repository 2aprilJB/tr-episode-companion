import React from "react";
import YouTube from "react-youtube";
import "./ClassicContainer.css";

const classicContainer = (props)=>{
    return(
        <div className="ClassicMainContainer">
            <YouTube opts={{height: "100%",width : "100%",borderRadius:"30px"}} videoId={props.vidId}></YouTube>
        </div>
    );
}

export default classicContainer;
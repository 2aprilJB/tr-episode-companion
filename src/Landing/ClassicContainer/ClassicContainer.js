import React from "react";
import YouTube from "react-youtube";
import "./ClassicContainer.css";

const classicContainer = ()=>{
    return(
        <div className="ClassicMainContainer">
            <YouTube opts={{height: "100%",width : "100%",borderRadius:"30px"}} videoId="XLI-Ka_pmiw"></YouTube>
        </div>
    );
}

export default classicContainer;
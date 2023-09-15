import React from "react";
import "./ShowMapButt.css";

const showMapButt = (props)=>{
    return(
        <div className="ShowMapContainer">
            <div className="ShowMap">
                <a href='/mapCVM'><ion-icon name="map-outline"></ion-icon></a>
            </div>
            <h3 className="ButtText">Show<br/>Map</h3>
        </div>
    );
}

export default showMapButt;
import React from "react";
import ArLogo from "../../Assets/ArLogo/ArLogo";
import ClassicContainer from '../ClassicContainer/ClassicContainer';
import './ArTech.css';

const arTech = (props)=>{

    return(
        <div className="ArTechContainer">
            <div className="MainLogo"><ArLogo/></div>
            <h2 className="ArHeading">AUGMENTED REALITY<br/>IN PLAY</h2>
            <div className="ArTechClassic"><ClassicContainer vidId = {props.videoIds[0]} /></div>
        </div>
    );
}

export default arTech;
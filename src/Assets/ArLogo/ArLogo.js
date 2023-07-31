import React from "react";
import ArLogo from '../Images/Ar_logo.PNG';
import "./ArLogo.css";

const arLogo = ()=>{
    return(
        <div><img className="ArLogoContainer" src={ArLogo}></img></div>
    );
}

export default arLogo;
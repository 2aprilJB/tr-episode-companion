import React from "react";
import LinttLogo from '../../assets/Lintt/Lintt';
import "./NavBarFix.css";

const navBarFix = (props)=>{
    return(
        <div className="NavBarFix">
            <div className="Menu" onClick={props.showMenuHandler}><ion-icon name="menu-outline"></ion-icon></div>
            <div className="Lintt"><LinttLogo/></div>
            <div className="Social"><ion-icon name="logo-instagram"></ion-icon></div>
        </div>
    );
}

export default navBarFix;
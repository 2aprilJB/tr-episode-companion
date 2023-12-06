import React from "react";
import Lintt from "../../Assets/Lintt/Lintt";
import "./AppBar.css";

const appBar = (props)=>{
    let appBarStyle = {};
    if(props.activeTeam !== "?"){
        appBarStyle = {backgroundColor:"transparent",animation:"none",border:"none"};
    }
    return(
        <div style={appBarStyle} className="AppBarWrapper">
            <div onClick={props.menuClick} className="MenuButt"><ion-icon name="menu-outline"></ion-icon></div>
            <div className="LinttButt">
                <div onClick= {props.hawkClick} className='LinttLogo'>
                    <Lintt/>
                </div>
            </div>
            <div onClick={props.newsClick} className="NewsButt"><ion-icon name="newspaper-outline"></ion-icon></div>
        </div>
    );
}

export default appBar;
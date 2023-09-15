import React from "react";
import "./LogoutButt.css";

const logoutButt = (props)=>{
    return(
        <div className="LogoutButtContainer">
            <div onClick={props.logoutHandler} className="LogoutButt">
                <ion-icon name="log-out-outline"></ion-icon>
            </div>
            <h3 className="ButtText">LOGOUT</h3>
        </div>
    );
}

export default logoutButt;
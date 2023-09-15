import React from "react";
import "./ShowPointsButt.css";

const showPointsButt = (props)=>{
    return(
        <div className="ShowPointsContainer">
            <div onClick={props.showPoints} className="ShowPoints">
                <ion-icon name="checkmark-done-circle-outline"></ion-icon>
            </div>
            <h3 className="ButtText">Show<br/>Points</h3>
        </div>
    );
}

export default showPointsButt;
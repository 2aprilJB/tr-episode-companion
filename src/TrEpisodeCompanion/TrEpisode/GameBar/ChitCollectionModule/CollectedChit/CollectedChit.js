import React from "react";
import "./CollectedChit.css";
import trLogo from "../../../../../Assets/Images/trLogo.png";


//To Use This Component Following props are required:-
//              backColor = "#ColorForBackGroundGradient" 
//              chitDet = ["AnArrayWhereFirstElementIsRiddleToDisplay","riddleCode","teamFound",""]

const collectedChit = (props)=>{
    let backColor
    if(props.backColor){
        backColor = props.backColor;
    }
    else{
        backColor = '#00000000';
    }
    let chitStyle = {backgroundImage:'linear-gradient(' + backColor + ',#00000000),url("https://c4.wallpaperflare.com/wallpaper/471/242/494/lakeside-morning-pink-wallpaper-preview.jpg")'}
    return(
        <div style={chitStyle} className="CollectedChitContainer">
            <img className="CollectedChitTrLogo" src={trLogo}></img>
            <h4 style={{marginBottom:"0.7rem",marginTop:"-1rem",fontFamily:"Oswald",color:"navajowhite"}}>TYPE - {props.chitDet[4]}</h4>
            <h4 style={{color:"white",fontFamily:"Lato",width:"92%"}}>
                {props.chitDet[0]}
            </h4>
            <h5 style={{color:"white",fontSize:"1.4rem",fontFamily:"Lato",marginTop:"2rem",textShadow:"0 0 3px yellow",letterSpacing:"0.2rem"}}>
                {props.chitDet[1]}
            </h5>
        </div>
    );
}

export default collectedChit
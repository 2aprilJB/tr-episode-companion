import React from "react";
import "./GameOver.css";
import ClassicContainer from "../../../Landing/ClassicContainer/ClassicContainer";
import trLogo from "../../../Assets/Images/trLogo.png";

const gameOver = ()=>{
    return(
        <div className="GameOverWrapper">
            <h4 style={{width:"90%",marginLeft:"auto",marginRight:"auto",fontFamily:"Oswald",color:"rgb(49,49,49)"}} className="AlertMainText">Game Over or <br/> About to Start</h4>
            <p>Keep Checking Updates Below</p>
            <div style={{height:"13rem",width:"20rem"}} className="GameOverVid">
                <ClassicContainer vidId = {"0jBpZhukZDs"}/>
            </div>
            <img className="GameOverTrLogo" src={trLogo}></img>
        </div>
    );
}

export default gameOver;
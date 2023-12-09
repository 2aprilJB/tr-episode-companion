import React from "react";
import "./PlayzonePopup.css";
import Countdown from "../../../Assets/CountDown/CountDown";
import { updatePopMsg } from "../../../FireStoreUtils/FireStoreUtils";

const playzonePopup = (props)=>{
    let msgArr = props.playPopMsg.split("#"); // 'Play' # 'TimeRef' # 'Team1' # 'Team2' 
    let countDownOpts = {refTime:msgArr[1],duration:props.duration};
    return(
        <div style={{height:"60%"}} className="CollectedChitsModuleContainer">
            <div className="AlertMainText">
                PlayZone Activated
            </div>
            <div style={{marginTop:"5%",width:"70%",marginLeft:"auto",marginRight:"auto"}}>
                <Countdown color = {["#fff","#F05941"]} options = {countDownOpts} timesUpAction = {()=>{updatePopMsg("calm")}} />
            </div>
            <div className="PlayzoneTeams">
                <h4>Reach Yellow Zone</h4>
                <div className="PlayzoneTeamsMainBlock">
                    <div className="PlayzoneTeamBlock">
                        <h6>Team</h6>
                        <h5>{msgArr[2]}</h5>
                    </div>
                    <h2 style={{height:"100%",fontSize:"0.9rem",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>V/S</h2>
                    <div className="PlayzoneTeamBlock">
                        <h6>Team</h6>
                        <h5>{msgArr[3]}</h5>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default playzonePopup;
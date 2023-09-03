import React, { Component } from "react";
import "./MapCvm.css";
import Footer from "../Footer/Footer";
import TheMap from './TheMap/TheMap';
import HeroDisplay from "../TrEpisodeCompanion/HeroDisplay/HeroDisplay";
import axios from "axios";

class MapCvm extends Component{
    state = {
    }
    componentDidMount(){
        
        
    }
    render(){
        return(
            <div className="MapCvmWrapper">
                
                <div className="MapInfoContainer">
                    <div className="MapOverlayFeatures">
                        <div className="LogoutButtContainer">
                            {this.props.loggedIn[0]?<div><div onClick={()=>this.props.logoutHandler(this.props.loggedIn)} className="LogoutButt">
                                <ion-icon name="log-out-outline"></ion-icon>
                            </div><h3 className="ButtText2">LOGOUT</h3></div>:null}
                        </div>
                        <h2 className="MapCvmTitle">MAP</h2>
                        <div className="ShowChitContainer">
                            {this.props.loggedIn[0]?<div><div className="ShowChit">
                                <a style={{marginTop:"0.4rem"}} href="/login"><ion-icon name="arrow-back-outline"></ion-icon></a>
                            </div><h3 className="ButtText2">Back</h3></div>:null}
                        </div>
                    </div>
                    <div className="MapContainer">
                        <TheMap activeTeamCoords = {this.props.activeTeamCoords} charCodesArr = {this.props.charCodesArr} activeTeam = {this.props.activeTeam} baseUrl = {this.props.baseUrl} />
                    </div>
                    
                    <div className="MapInfo">
                        <div className="TeamDetailsMap">
                            <h5>TEAM</h5>
                            <h3 className="TeamCodeMap">{this.props.activeTeam}
                            </h3>
                        </div>
                        <HeroDisplay addSpace baseUrl = {this.props.baseUrl + 'billBoards/mapCVM'}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default MapCvm;
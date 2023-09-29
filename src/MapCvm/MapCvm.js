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
        let loggedIn = document.cookie.split(",");
        return(
            <div className="MapCvmWrapper">
                
                <div className="MapInfoContainer">
                    <div className="MapOverlayFeatures">
                        <div className="LogoutButtContainer">
                            {loggedIn[0]?<div><div onClick={()=>this.props.logoutHandler(loggedIn)} className="LogoutButt">
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
                        <TheMap setPublicCoordsForProxies ={this.props.setPublicCoordsForProxies} activeTeamCoords = {this.props.activeTeamCoords} activeTeam = {this.props.activeTeam} baseUrls = {this.props.baseUrls} />
                    </div>
                    {/* See the button below we'll be prepareing it to take snapshit of all PArticipants------------------------ */}
                    <div className="MapInfo">
                        {this.props.activeTeam==='Z0'?<button style={{position:"absolute",top:"3%",left:"44.5%"}} className="ShowButt"><ion-icon name="bonfire-outline"></ion-icon></button>:null}
                        <div className="TeamDetailsMap">
                            <h5>TEAM</h5>
                            <h3 className="TeamCodeMap">{this.props.activeTeam}
                            </h3>
                        </div>
                        <div className="AddSpaceToMapCvm" style={{height:"3rem"}}></div>
                        <HeroDisplay addSpace baseUrl = {this.props.baseUrls.staticBase + 'billBoards/mapCVM'}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default MapCvm;
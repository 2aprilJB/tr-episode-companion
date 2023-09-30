import React, { Component } from "react";
import "./MapCvm.css";
import Footer from "../Footer/Footer";
import TheMap from './TheMap/TheMap';
import HeroDisplay from "../TrEpisodeCompanion/HeroDisplay/HeroDisplay";
import Loader from "../Assets/Loader/Loader";
import axios from "axios";

class MapCvm extends Component{
    state = {
        // loading:true
    }
    componentDidMount(){
    }
    render(){
        let loggedIn = document.cookie.split(",");
        
        return(
            <div className="MapCvmWrapper">
                {/* {this.state.loading?<Loader loaded = {false} />:<Loader loaded = {true} />} */}
                <div className="MapInfoContainer">
                    

                    {this.props.activeTeamCoords?<div className="MapContainer">
                        <TheMap draggedCoords = {this.props.draggedCoords} setDraggedCoords = {this.props.setDraggedCoords} setPublicCoordsForProxies ={this.props.setPublicCoordsForProxies} activeTeamCoords = {this.props.activeTeamCoords} activeTeam = {this.props.activeTeam} baseUrls = {this.props.baseUrls} />
                    </div>:<Loader loaded = {false}/>}

                    {/* See the button below we'll be prepareing it to take snapshit of all Participants------------------------ */}
                    <div className="MapInfo">
                        {this.props.activeTeam==='Z0'?<button style={{position:"absolute",top:"3%",left:"44.5%"}} className="ShowButt"><ion-icon name="bonfire-outline"></ion-icon></button>:null}
                        <div className="TeamDetailsMap">
                            <h5>TEAM</h5>
                            <h3 className="TeamCodeMap">{this.props.activeTeam}
                            </h3>
                        </div>
                        <div className="MapOverlayFeatures">
                            <div className="LogoutButtContainer">
                                {loggedIn[0]?<div><div onClick={()=>this.props.logoutHandler(loggedIn)} className="LogoutButt">
                                    <ion-icon name="log-out-outline"></ion-icon>
                                </div><h3 className="ButtText2">LOGOUT</h3></div>:null}
                            </div>
                            {this.props.loggedIn[0]?<div className="BackToHomeContainer"><div className="BackToHome">
                                <a style={{marginTop:"0.4rem"}} href="/login"><ion-icon name="arrow-back-outline"></ion-icon></a>
                            </div><h3 className="ButtText2">Back</h3></div>:null}
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
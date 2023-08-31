import React, { Component } from "react";
import "./MapCvm.css";
import Footer from "../Footer/Footer";
import TheMap from './TheMap/TheMap';
import HeroDisplay from "../TrEpisodeCompanion/HeroDisplay/HeroDisplay";
import axios from "axios";

class MapCvm extends Component{
    state = {
        activeTeam: '?',
        charCodesArr:[]
    }
    componentDidMount(){
        let tempTeam = document.cookie.split(',')[1]?document.cookie.split(',')[1]:'?';
        
        axios.get(this.props.baseUrl + 'characters/0.json')
             .then(resp=>{
                this.setState({
                    activeTeam:tempTeam,
                    charCodesArr:resp.data
                })
             })
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
                        <TheMap charCodesArr = {this.state.charCodesArr} activeTeam = {this.state.activeTeam} baseUrl = {this.props.baseUrl} />
                    </div>
                    
                    <div className="MapInfo">
                        <div className="TeamDetailsMap">
                            <h5>TEAM</h5>
                            <h3 className="TeamCodeMap">{this.state.activeTeam}
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
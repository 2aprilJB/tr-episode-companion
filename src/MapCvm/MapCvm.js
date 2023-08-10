import React, { Component } from "react";
import "./MapCvm.css";
import Footer from "../Footer/Footer";
import TheMap from './TheMap/TheMap';
import HeroDisplay from "../TrEpisodeCompanion/HeroDisplay/HeroDisplay";

class MapCvm extends Component{
    state = {
        activeTeam: '?'
    }
    componentDidMount(){
        let tempTeam = document.cookie.split(',')[1]?document.cookie.split(',')[1]:'?';
        this.setState({
            activeTeam:tempTeam
        })
    }
    render(){
        return(
            <div className="MapCvmWrapper">
                <a href = "/polygonGen" className="PolygonGenButt">Poly</a>
                <h2 className="MapCvmTitle">CV Map</h2>
                <div className="MapInfoContainer">
                    <div className="MapContainer">
                        <TheMap activeTeam = {this.state.activeTeam} baseUrl = {this.props.baseUrl} />
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
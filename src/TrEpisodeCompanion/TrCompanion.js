import React from "react";
import "./TrCompanion.css";
import LoginPopup from "./LoginPopup/LoginPopup";
import TrEpisode from "./TrEpisode/TrEpisode";
import { Component } from "react";
import axios from "axios";
import Loader from "../Assets/Loader/Loader";
import { Route, Routes } from "react-router-dom";
import HeroDisplay from "./HeroDisplay/HeroDisplay";

/* This Login Module works by passing an array of Credentials
Each Array contains, [username, passcode] */

/* if loggedIn === true, The main Module to display can be replaced with null */
class TrCompanion extends Component{
    state = {
        loading: true,
        mainCountdown: {}
    }

    componentDidMount(){
        // let outlineCoords = [[23.23854,72.66644],[23.23843,72.66653],[23.23771,72.66786],[23.23763,72.66806],[23.23749,72.66833],[23.23699,72.66926],[23.2373,72.66946],[23.23765,72.66966],[23.23829,72.67004],[23.23846,72.67014],[23.23861,72.67026],[23.23888,72.67053],[23.2395,72.67095],[23.23969,72.67067],[23.23976,72.67055],[23.23981,72.67042],[23.23984,72.67017],[23.23986,72.6698],[23.23989,72.66944],[23.23997,72.66924],[23.24006,72.66905],[23.24075,72.66775],[23.23968,72.66711],[23.23893,72.66662],[23.23879,72.66652],[23.23863,72.66644]];
        // axios.put(this.props.baseUrl.staticBase + 'publicCoords/polygons/outlineBoundary/polyCoords.json',outlineCoords)
        //      .catch(err=>{
        //         console.log(err);
        //         alert("There's some serious Netwrok threat for our CEO of TR...")
        //      })
        axios.get(this.props.baseUrl.staticBase + 'storeOptions/mainCountdown.json')
             .then(resp=>{
                this.setState({
                    mainCountdown: resp.data
                })
             })
        this.setState({
            loading: false
        })
    }
    render(){
        return(
            <div className="MainContainer">
                {this.state.loading?<Loader loaded = {false} />:<Loader loaded = {true} />}
                {this.props.loggedIn[0]?<TrEpisode mainCountdown = {this.state.mainCountdown} secondaryProxy = {this.props.secondaryProxy} publicCoords = {this.props.publicCoords} draggedCoords = {this.props.draggedCoords} setDraggedCoords = {this.props.setDraggedCoords}  setPublicCoordsForProxies ={this.props.setPublicCoordsForProxies} activeProxyZoneHandler = {this.props.activeProxyZoneHandler} activeProxyZone = {this.props.activeProxyZone} activeTeamCoords = {this.props.activeTeamCoords} storeOptions = {this.props.storeOptions} setActiveCoords = {this.props.setActiveCoords} baseUrl = {this.props.baseUrl} loggedIn = {this.props.loggedIn} logoutHandler = {this.props.logoutHandler} activeTeam = {this.props.loggedIn[1]}/>:
                    <div className="LoginPage">
                        <HeroDisplay baseUrl = {this.props.baseUrl.staticBase + 'billBoards/loginPage'} />
                        <LoginPopup credentialsUrl = {this.props.credentialsUrl} loggedInHandler={this.props.loggedInHandler} loggedIn = {this.props.loggedIn} />
                    </div>
                }
            </div>
        );
            }
}

export default TrCompanion;


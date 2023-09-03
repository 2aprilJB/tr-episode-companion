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
    }

    componentDidMount(){
        this.setState({
            loading: false
        })
    }
    render(){
        return(
            <div className="MainContainer">
                {this.state.loading?<Loader loaded = {false} />:<Loader loaded = {true} />}
                {this.props.loggedIn[0]?<TrEpisode storeOptions = {this.props.storeOptions} charCodesArr = {this.props.charCodesArr} setActiveCoords = {this.props.setActiveCoords} baseUrl = {this.props.baseUrl} loggedIn = {this.props.loggedIn} logoutHandler = {this.props.logoutHandler} activeTeam = {this.props.loggedIn[1]}/>:
                    <div className="LoginPage">
                        <HeroDisplay baseUrl = {this.props.baseUrl + 'billBoards/loginPage'} />
                        <LoginPopup credentialsUrl = {this.props.credentialsUrl} loggedInHandler={this.props.loggedInHandler} loggedIn = {this.props.loggedIn} />
                    </div>
                }
            </div>
        );
            }
}

export default TrCompanion
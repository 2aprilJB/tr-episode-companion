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
        loggedIn: [false,'Z'],
        credentialsUrl: this.props.baseUrl + 'credentials',
        loading: true,
    }


    loggedInHandler = (tempLog)=>{
        this.setState({
            loggedIn: tempLog
        })
    }
    logoutHandler = (loggedIn)=>{
        this.setState({
            loading: true
        })
        axios.get(this.state.credentialsUrl + '.json')
             .then(resp=>{
                let creds = resp.data;          //Retrieving credentials array from server
                creds.map((ele,ind)=>{
                    if(ele[3]===loggedIn[1]){ //Finding credential using TeamCode
                        console.log(this.state.credentialsUrl + '/' + ind + '/2' + '.json')
                        creds[ind][2] = false;
                        axios.put(this.state.credentialsUrl + '/' + ind + '.json',creds[ind]) //Updating credentials that user has logged out
                             .then(resp=>{
                                this.setState({
                                    loading: false
                                })
                             }) 
                            .catch(err=>{
                                console.log(err);
                                alert('Theres some serious Network Error');
                             })
                    }
                    else{
                        this.setState({  //Loaded with wrong 
                            loading: false
                        })
                    }
                })
                document.cookie = 0;  
             })
             .catch(err=>{
                console.log(err);
                alert('Theres some serious Network Error');
             })

        this.setState({    //Updating root state to load back to the login screen
            loggedIn: [false,'Z']
        })
        //Lastly we will be clearing the cookie to default null or 0
    }
    componentDidMount(){
        this.setState({
            loading: false
        })
        let cookArr = document.cookie;
        if(cookArr != '0'){
            this.setState({
                loggedIn: cookArr.split(",")
            })
        }
        else{
        }
    }
    render(){
        return(
            <div className="MainContainer">
                {this.state.loading?<Loader loaded = {false} />:<Loader loaded = {true} />}
                {this.state.loggedIn[0]?<TrEpisode loggedIn = {this.state.loggedIn} logoutHandler = {this.logoutHandler} activeTeam = {this.state.loggedIn[1]}/>:
                    <div className="LoginPage">
                        <HeroDisplay baseUrl = {this.props.baseUrl + 'billBoards/homePage'} />
                        <LoginPopup credentialsUrl = {this.state.credentialsUrl} loggedInHandler={this.loggedInHandler} loggedIn = {this.state.loggedIn} />
                    </div>
                }
            </div>
        );
            }
}

export default TrCompanion
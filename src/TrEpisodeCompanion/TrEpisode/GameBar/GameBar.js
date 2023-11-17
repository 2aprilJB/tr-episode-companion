import React, { Component, Fragment } from "react";
import "./GameBar.css"
import AlertModule from "../../AlertModule/AlertModule";
import ChitCollectionModule from "./ChitCollectionModule/ChitCollectionModule";
import ResourcesModule from "./ResourcesModule/ResourcesModule";
import axios from "axios";

class GameBar extends Component{
    state={
        showResources: false,
        showChits: false,
        showAlert: false,
        alertMsg: [],
        resources:[]
    }
    
    setAlertMsg = (snapShot)=>{
        this.setState({
            alertMsg: snapShot
        });
    }


    componentDidMount(){
        axios.get(this.props.baseUrl.staticBase + 'resources.json')
             .then(resp=>{
                this.setState({
                    resources: resp.data
                })
             })
             .catch(err=>{
                console.log(err);
                alert("There is some seroius network error on the way..Hey Morty its me...brrrp i'm stuckkk");
             })
    }
    render(){
        let alertButtStyle,chitsButtStyle,resourcesButtStyle,alertIcon,chitsIcon,resourcesIcon;
        chitsIcon = "albums-outline";
        alertIcon = "notifications-outline";
        resourcesIcon = "library-outline"
        alertButtStyle = {animation:"alertGlow 0.3s infinite ease-in-out"};
        chitsButtStyle = {};
        resourcesButtStyle = {};
        let onAlertClick = ()=>{
            let prev = this.state.showAlert;
            this.setState({
                showAlert: !prev
            })
        }
        let onChitsClick = ()=>{
            let prev = this.state.showChits;
            this.setState({
                showChits: !prev
            })
        }
        let onResourcesClick = ()=>{
            let prev = this.state.showResources;
            this.setState({
                showResources: !prev
            })
        }
        if(this.state.alertMsg[0]==='killer'){
            alertButtStyle = {animation:"alertGlow 0.3s infinite ease-in-out"};
            alertIcon = "skull-outline"
        }
        else if(this.state.alertMsg[0]==='betting'){
            alertButtStyle = {border:"4px solid #186F65",animation:"alertGlow 0.3s infinite ease-in-out"};
            alertIcon = "cash-outline";
        }
        else if(this.state.alertMsg[0]==='calm'){
            alertButtStyle = {};
            alertIcon = "notifications-outline";
        }

        if(this.state.showAlert){
            alertIcon = "close-outline";
            alertButtStyle = {fontSize:"4rem",color: "#952323",border:"4px solid #C70039"};
        }
        if(this.state.showChits){
            chitsIcon = "close-outline";
            chitsButtStyle = {fontSize:"4rem",color: "#C70039"};
        }
        if(this.state.showResources){
            resourcesIcon = "close-outline";
            resourcesButtStyle = {fontSize:"4rem",color: "#C70039"};
        }
        return(
            <Fragment>
                <div className="GameBarWrapper">
                    <div style={chitsButtStyle} className="GameBarShowButt" onClick={onChitsClick}><ion-icon name={chitsIcon}></ion-icon></div>
                    <div style={alertButtStyle} onClick={onAlertClick} className="GameBarAlertBall"><ion-icon name={alertIcon}></ion-icon></div>
                    <div style={resourcesButtStyle} className="GameBarShowButt" onClick={onResourcesClick}><ion-icon name={resourcesIcon}></ion-icon></div>
                </div>
                <AlertModule noCross={true} display = {this.state.showAlert} setAlertState = {this.setAlertMsg} />
                {this.state.showChits?<ChitCollectionModule activeTeam = {this.props.activeTeam} baseUrl = {this.props.baseUrl} display = {this.state.showChits} />:null}
                {this.state.showResources?<ResourcesModule display = {this.state.showResources} resources = {this.state.resources} />:null}
            </Fragment>
        );
    }
}

export default GameBar;
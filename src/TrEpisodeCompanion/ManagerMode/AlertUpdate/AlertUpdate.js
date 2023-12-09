import {updateAlertMsg, updatePopMsg} from "../../../FireStoreUtils/FireStoreUtils"
import React, { Component } from "react";
import axios from "axios";
import "./AlertUpdate.css";

class AlertUpdate extends Component{
    state={
        currValue: ''
    }
    onChangeHandler = (e)=>{
        this.setState({
            currValue: e.target.value
        })
    }

    onClickHandler = ()=>{
        if(window.confirm("Are you sure to send?"))
            updateAlertMsg(this.state.currValue);
        else{
            console.log('Well Its your call')
        }
    }
    onPlayButtonClick = ()=>{
        if(window.confirm("Updated Active users list??")){
            axios.get(this.props.baseUrl.dynamicBase3 + 'activeCreds.json')
                 .then(resp=>{
                    let aC = resp.data;
                    let range = aC.length - 1;
                    let random1 = Math.floor(Math.random()*range);
                    let random2 = Math.floor(Math.random()*range);
                    
                    let timeRef = new Date().toString().split(" ")[4];              //Getting the current TimeRef According to the manager
                    updatePopMsg("play#" + timeRef + "#" + aC[random1] + "#" + aC[random2]);
                 })
                 .catch(err=>{
                    console.log(err);
                    alert("Got some load of Errors");
                 })
        }
        else{
            alert('Tap on the last button and add the list of activeTeams');
        }
    }
    onKButtonClick = ()=>{
        let charToKill = prompt("Enter Which Character to Kill ?");
        let rewardPts = prompt("How Much Point to put as Reward ?");
        let timeRef = new Date().toString().split(" ")[4];              //Getting the current TimeRef According to the manager
        let duration = prompt("Duration of this MiniGame: ");
        if(charToKill){
            if(rewardPts)
                updateAlertMsg('killer#' + charToKill + '#' + rewardPts + '#' + timeRef + '#' + duration);
            else{
                alert('Okay wise choice, or you missed, try again');
            }
        }
        else{
            alert('Okay wise choice, or you missed, try again');
        }
        
    }
    onBetButtonClick = ()=>{
        let textToAlert = prompt("Enter Something to alert ?");
        let rewardPts = prompt("How Much Point to put as Reward ?");
        if(textToAlert){
            if(rewardPts)
                updateAlertMsg('betting#' + textToAlert + '#' + rewardPts);
            else{
                alert('Okay wise choice, or you missed, try again');
            }
        }
        else{
            alert('Okay wise choice, or you missed, try again');
        }
    }
    onCalmButtonClick = ()=>{
        if(window.confirm('Wanna Calm The Crap?')){
            updateAlertMsg('calm#Treasure Royale#' +34);
        }
    }
    onPlayZoneButtonClick = ()=>{

    }
    render(){
        return(
            <div className="IssueAlert">
                        Enter Alert:-
                        <div className="AddAlertWrapper">
                            <input onChange = {(e)=>this.onChangeHandler(e)} type="text" className="AlertText"></input>
                            <button onClick={this.onClickHandler} className="SubmitAlert"><ion-icon name="caret-forward-outline"></ion-icon></button>
                            <button onClick={this.onKButtonClick} className="SubmitAlert">K</button>
                            <button onClick={this.onBetButtonClick} className="SubmitAlert">B</button>
                            <button onClick={this.onPlayButtonClick} className="SubmitAlert">P</button>
                            <button onClick={this.onCalmButtonClick} className="SubmitAlert">C</button>
                        </div>
                        
            </div>
        );
    };
    
}

export default AlertUpdate;
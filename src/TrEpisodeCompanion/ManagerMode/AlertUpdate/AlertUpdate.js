import {updateAlertMsg} from "../../../FireStoreUtils/FireStoreUtils"
import React, { Component } from "react";
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
    onKButtonClick = ()=>{
        let charToKill = prompt("Enter Which Character to Kill ?");
        let rewardPts = prompt("How Much Point to put as Reward ?");
        if(charToKill){
            if(rewardPts)
                updateAlertMsg('killer#' + charToKill + '#' + rewardPts);
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
    render(){
        return(
            <div className="IssueAlert">
                        Enter Alert:-
                        <div className="AddAlertWrapper">
                            <input onChange = {(e)=>this.onChangeHandler(e)} type="text" className="AlertText"></input>
                            <button onClick={this.onClickHandler} className="SubmitAlert"><ion-icon name="caret-forward-outline"></ion-icon></button>
                            <button onClick={this.onKButtonClick} className="SubmitAlert">K</button>
                            <button onClick={this.onBetButtonClick} className="SubmitAlert">B</button>
                            <button onClick={this.onBetButtonClick} className="SubmitAlert">P</button>
                        </div>
                        
            </div>
        );
    };
    
}

export default AlertUpdate;
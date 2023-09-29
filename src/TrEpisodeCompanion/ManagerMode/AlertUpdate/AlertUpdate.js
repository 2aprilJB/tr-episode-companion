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
    render(){
        return(
            <div className="IssueAlert">
                        Enter Alert:-
                        <div className="AddAlertWrapper">
                            <input onChange = {(e)=>this.onChangeHandler(e)} type="text" className="AlertText"></input>
                            <button onClick={this.onClickHandler} className="SubmitAlert"><ion-icon name="caret-forward-outline"></ion-icon></button>
                        </div>
            </div>
        );
    };
    
}

export default AlertUpdate;
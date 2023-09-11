import {updateAlertMsg} from "../../../FireStoreUtils/FireStoreUtils"
import React from "react";
import "./AlertUpdate.css";

const alertUpdate = ()=>{
    let currentAlertInp = null;
    let onChangeHandler = (e)=>{
        currentAlertInp = e.target.value;
    }

    let onClickHandler = ()=>{
        if(window.confirm("Are you sure to send?"))
            updateAlertMsg(currentAlertInp);
        else{
            console.log('Well Its your call')
        }
    }
    return(
        <div className="IssueAlert">
                    Enter Alert:-
                    <div className="AddAlertWrapper">
                        <input onChange = {(e)=>onChangeHandler(e)} type="text" className="AlertText"></input>
                        <button onClick={onClickHandler} className="SubmitAlert"><ion-icon name="caret-forward-outline"></ion-icon></button>
                    </div>
        </div>
    );
}

export default alertUpdate;
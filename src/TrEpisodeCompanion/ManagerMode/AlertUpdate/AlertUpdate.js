import React from "react";
import "./AlertUpdate.css";
import axios from "axios";

const alertUpdate = (props)=>{
    let currentAlertInp = null;
    let onChangeHandler = (e)=>{
        currentAlertInp = e.target.value;
    }

    let onClickHandler = ()=>{
        let url = props.baseUrl;
        axios.get(url + 'alertMsg.json')
             .then(resp=>{
                let prevMsg = resp.data;
                console.log(prevMsg);
                axios.put(url + 'alertMsg.json',{msg: currentAlertInp})
                     .catch(err=>{
                        alert('SOme new Network issue has caught up')
                        console.log(err);
                    })
             })
             .then(resp=>{
                alert('Alert Has been updated!');
             })
             .catch(err=>{
                alert('SOme new Network issue has caught up')
                console.log(err);
             })
        console.log(currentAlertInp)
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
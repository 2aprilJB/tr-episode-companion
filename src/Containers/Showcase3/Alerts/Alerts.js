import React from 'react';
import classes from './Alerts.module.css';

const alerts = (props)=>{
    let noAlert = "Hey Its LINTT's fault it will soon be";
    return(
        <div className = {classes.Alerts}>
            <h2 className = {classes.Alerts__heading}>Possible Answers</h2>
            <div className = {classes.StylingLine}></div>

            {
                props.alerts?
                props.alerts.map((alert,ind)=>{
                return <div key = {alert + ind} className = {classes.Alert}>
                        {alert.imageContent?<div className = {classes.ImageContent}></div> : null}
                        {alert.info ? alert.info : noAlert}
                    </div>;
                }): <div className = {classes.Alert}>{noAlert}</div>
            }
        </div>
    );
}

export default alerts;
import React from 'react';
import classes from './StyledBreak.module.css';

const styledBreak = (props)=>{
    return(
    <div style = {{color: props.divColor}} className = {classes.StylingIconsLines}>
        <ion-icon name = "flower"/>
        <div style = {{width: props.lineWidth + '%', borderBottom: '3px solid '+ props.divColor}} className = {classes.StylingLine}></div>
        <ion-icon name = "flower-outline"/>
        <div style = {{width: props.lineWidth + '%', borderBottom: '3px solid '+ props.divColor}} className = {classes.StylingLine}></div>
        <ion-icon name = "flower"/>
    </div>
    );
}

export default styledBreak;
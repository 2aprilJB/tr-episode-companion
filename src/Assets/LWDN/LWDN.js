import React from 'react';
import lwdnLogo from '../Images/LWDN.jpg';
import classes from './LWDN.module.css';

const lwdn = ()=>{
    return(
        <img className = {classes.LwdnLogo} src = {lwdnLogo} alt = "LWDNlogo"></img>
    );
}

export default lwdn;
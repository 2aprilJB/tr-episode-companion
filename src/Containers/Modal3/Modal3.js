import React, { useEffect, useState } from 'react';
import classes from './Modal3.module.css';

//To use this Modal Container
//Add following props "show" for showModal in parent State as:True/False and 
//"onBackDrop" for function in parent component as to setState to false
//Add children accordingly

const Modal = (props)=>{
    const [showContent,setShowContent] = useState();
    useEffect(()=>{
        setShowContent(false);
    },[])
    let onShowContent = ()=>{
        setShowContent(!showContent);
    }
    let mooodal = <div className = {classes.BackDrop}>
                    <button onClick={onShowContent} className={classes.Modal3ShowContent}>Bitch</button>
                    {showContent?
                        <div className = {classes.ModalWrapper}>
                            {props.noCross?null:<div onClick = {props.onBackDrop} className = {classes.Cross}><ion-icon name="close-outline"></ion-icon></div>}
                            {props.children}
                        </div>
                    :null}
                  </div>
    return props.show?mooodal:null;
}
export default Modal;
import React from 'react';
import classes from './Modal2.module.css';

//To use this Modal Container
//Add following props "show" for showModal in parent State as:True/False and 
//"onBackDrop" for function in parent component as to setState to false
//Add children accordingly

const modal = (props)=>{
    let mooodal = <div className = {classes.BackDrop}>
                    <div className = {classes.ModalWrapper}>
                        {props.noCross?null:<div onClick = {props.onBackDrop} className = {classes.Cross}><ion-icon name="close-outline"></ion-icon></div>}
                        {props.children}
                    </div>
                  </div>
    return props.show?mooodal:null;
}
export default modal;
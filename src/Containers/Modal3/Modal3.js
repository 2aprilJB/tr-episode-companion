import React, { useEffect, useState } from 'react';
import classes from './Modal3.module.css';
import "./Modal3.css";

//To use this Modal Container
//Add following props "show" for showModal in parent State as:True/False and 
//"onBackDrop" for function in parent component as to setState to false
//Add children accordingly

const Modal = (props)=>{
    const [showContent,setShowContent] = useState();
    const [buttStyle,setButtSyle] = useState();
    useEffect(()=>{
        setShowContent(false);
        if(props.top){
            setButtSyle({backgroundColor:"yellow",marginBottom:"4rem"});
        }
        else{
            setButtSyle({});
        }
        
    },[])
    let onShowContent = ()=>{
        if(!showContent){
                setButtSyle({position:"relative",bottom:"-1rem",width:"2.5rem",height:"2.5rem",backgroundColor:"transparent",animation:"none",backgroundImage:"url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/1024px-Flat_cross_icon.svg.png')"});
        }
        else{
            if(props.top){
                setButtSyle({backgroundColor:"yellow",top:"4.5rem",left:"1rem",width:"2rem",height:"2rem"});
            }
            else{
                setButtSyle({});
            }
        }
        setShowContent(!showContent);
    }
    let mooodal = <div className = {classes.BackDrop}>
                    {showContent?
                        <div className = {classes.ModalWrapper}>
                            {props.noCross?null:<div onClick = {props.onBackDrop} className = {classes.Cross}><ion-icon name="close-outline"></ion-icon></div>}
                            {props.children}
                        </div>
                    :null}
                    <button style={buttStyle} onClick={onShowContent} className = "Modal3ShowContent"></button>
                  </div>
    return props.show?mooodal:null;
}
export default Modal;
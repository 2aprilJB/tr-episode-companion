import React from 'react';
import Lintt from '../../Assets/Lintt/Lintt';
import classes from './Menu.module.css';
//To use this Component, add "li" elements in "ul" with an OnClick function
//that pushes url, see example below
//give a props of "backDrop" in the parent component,
//where the backDrop function sets State to ShowMenu : True or False
const menu = (props)=>{
    // let onKnow = ()=>{
    //     props.backDrop();
    //     window.scrollTo(100,800);
    // }
    // let onThirty = ()=>props.history.push("/");
    // let onCGFU = ()=>props.history.push("/CGFU");
    // let onBlogClick = ()=>props.history.push("/blogs");
    return(
        <div className = {classes.Menu}>
            <div className = {classes.ThirtyContainer}>
                <a className='HomeLink' href='/'>
                    <Lintt/>
                    -HOME-
                </a>
            </div>
            <ul className = {classes.Menu__elements}>
                {/* <li onClick = {onCGFU}>CGFU</li>
                <li onClick = {onKnow}>Know More</li>
                <li>Ongoing Event</li>
                <li onClick = {onBlogClick}>Lintt BLOGS</li> */}
                <li><a href='/login'>Login</a></li>
                <li><a href='/managerMode'>Manager Mode</a></li>
                <li><a href='/mapCVM'>Maps and Findings</a></li>
                <li><a href='/contactUs'>Code Validation</a></li>
            </ul>

            <div className = {classes.Menu__videos}></div>
            <button onClick = {props.backDrop} className = {classes.Menu__backDrop}><ion-icon name = "log-out" /></button>
        </div>
    );
}

export default menu;
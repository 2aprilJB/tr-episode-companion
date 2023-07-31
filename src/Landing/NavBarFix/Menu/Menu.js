/*
HOW TO USE THIS MENU COMPONENT

It uses two props :-
  1. showMenu
  2. showMenuHandler 

Set Transition animation in the Stylesheet, for '.MnuContainer' 
*/


import React from "react";
import "./Menu.css";

const menu = (props)=>{
    //Setting Style for transition appearance, 0 (default in stylesheet) and -100% (to Disappear)
    let menuStyle = null;
    if(props.showMenu)
        menuStyle = null; // top: '0' APPEARANCE
    else
        menuStyle = {top: "-100%"} // top: '-100%' DISAPPEARANCE

    let links = props.links;    
    // for(let b =0;b < links.length;i++){
    //     return(
    //         <li href = {links[b][1]}>{links[b][0]}</li>
    //     );
    //     }    
    return(
        <div style={menuStyle} className="MenuContainer">
            <div>Lintt Logo</div>
            <h1 className="MenuHeading">TR<br/>MENU</h1>
            <ul className="MenuLinks">
                {
                    links.map(b=>{
                        return(
                            <a key = {"a" + links.indexOf(b)} href = {b[1]}>{b[0]}</a>
                        )
                    })
                }
            </ul>

            <div className="CloseMenu" onClick={props.showMenuHandler} > X </div>
        </div>
    );
}

export default menu;
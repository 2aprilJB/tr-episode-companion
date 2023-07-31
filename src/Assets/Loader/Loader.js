import React from "react";
import "./Loader.css";
import Lintt from '../Lintt/Lintt';

const loader = (props)=>{
    return(
        <div className={props.loaded?"FadeOutLoader":"FadeInLoader"}>
            <div className={"LinttContainer"}>
                <Lintt/>
            </div>
        </div>
    )
}

export default loader;
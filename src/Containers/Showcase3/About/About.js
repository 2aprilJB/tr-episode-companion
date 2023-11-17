import React from 'react';
import classes from './About.module.css';

const about = (props)=>{
    return(
        <div className = {classes.About}>
            <h2 className = {classes.Heading}>
                --About--
            </h2>
            <div style = {{backgroundImage: 'url(' + props.about.aboutImage + ')'}} className = {classes.ImageContent}>
            </div>
            <div className = {classes.InfoContent}>
                {props.about.info}
            </div>
        </div>
    );
}

export default about;
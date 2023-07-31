import React from 'react';
import './IntroInfo.css';

const introInfo = (props)=>{
    let infoShowcaseImg = 'linear-gradient(#000000d5,#00000000),url(' + props.infoShowcaseImg + ')'; 
    return(
        <div className="IntroInfo">
            <div className="InfoShowcase" style={{backgroundImage: infoShowcaseImg}}>here We go</div>
            <h4 className="IntroTagline">Enter the world with<br/>A new Perspective</h4>
            <div className="StylingLine"></div>
            <h2 className="HeadingTitle">TREASURE<br/>ROYALE</h2>
        </div>
    );
}

export default introInfo;
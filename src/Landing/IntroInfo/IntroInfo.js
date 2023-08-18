import React from 'react';
import './IntroInfo.css';
import Mars from '../../Assets/Images/mars.png';
import Jupiter from '../../Assets/Images/jupiter.png';
import Neptune from '../../Assets/Images/neptune.png';
import Saturn from '../../Assets/Images/saturn.png';
import Moon from '../../Assets/Images/moon.png';
import Uranus from '../../Assets/Images/uranus.png';

const introInfo = (props)=>{
    let infoShowcaseImg = 'linear-gradient(#000000d5,#00000000),url(' + props.infoShowcaseImg + ')'; 
    return(
        <div className="IntroInfo">
            <div className="Planeterium">
                <div className='Mars'><img src={Mars}></img></div>
                <div className='Jupiter'><img src={Jupiter}></img></div>
                <div className='Neptune'><img src={Neptune}></img></div>
                <div className='Saturn'><img src={Saturn}></img></div>
                <div className='Moon'><img src={Moon}></img></div>
                <div className='Uranus'><img src={Uranus}></img></div>
            </div>
            <div className="InfoShowcase" style={{backgroundImage: infoShowcaseImg}}></div>
            <h4 className="IntroTagline">Enter the world with<br/>A new Perspective</h4>
            <div className="StylingLine"></div>
            <h2 className="HeadingTitle"><b style={{color: "#045aa1"}}>TREASURE</b><br/><b style={{color:"#c70039"}}>ROYALE</b></h2>
        </div>
    );
}

export default introInfo;
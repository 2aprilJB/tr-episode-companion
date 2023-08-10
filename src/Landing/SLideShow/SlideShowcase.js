import React from 'react';
import './SlideShowcase.css';
import Showcase2 from '../../Containers/Showcase2/Showcase2';

const slideShowcase = ()=>{
    return(
        <div className='ShowcaseContainer'>
            <div className="ShowcaseTagline">
                WE<br/>
                DO THE BEST<br/>
                TO NUDGE YOU<br/>
                OFF YOUR<br/>
                SCREEN SCROLLING.
            </div>
            <Showcase2 colors = {['#c70039','#1eb2a6']} activeSub = {0} modules = {['Events','The App']}>
                <div className="Events">Events</div>
                <div className="TheApp">TheApp</div>
            </Showcase2>
        </div>
    );
}

export default slideShowcase;
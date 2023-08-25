import React from "react";
import "./TheQuote.css";
import ArLogo from "../../Assets/ArLogo/ArLogo";

const theQuote = ()=>{
    
        
    return(
        <div className="TheQuoteContainer">
            <div className="ArLogo1"><ArLogo/></div>
            <div className="ArLogo2"><ArLogo/></div>
            <div className="ArLogo4"><ArLogo/></div>
            <div className="ArLogo3"><ArLogo/></div>
            <h4 className="TheQuote">
                <b className="QuotePara1">What if augmented<br/>
                reality could make<br/>
                us better?</b>
                <b className="QuotePara2">Could it<br/>
                nudge us off the<br/>
                couch for a Saturday <br/>
                in the park?</b><br/>
                <b className="QuotePara3">Could it draw
                us into public space?<br/></b>
                <b className="QuotePara2">And into contact<br/>
                with neighbors we<br/>
                might never have<br/>
                met?<br/><em className="TheBold">We believe it
                can.</em></b> 
            </h4>
        </div>
    );
}

export default theQuote;
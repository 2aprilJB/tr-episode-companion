import React, { useEffect, useState } from "react";
import "./CountDown.css";


//Props this Asset takes: 'timesUpAction' , 'refTime' , 'duration'

const Countdown = (props)=>{
    const [over,setOver] = useState();
    const [minSec,setMinSec] = useState();
    let pOpts = props.options
    useEffect(()=>{
        
        setOver(false);
        setMinSec([0,0]);
        // Set the date we're counting down to
        let today = new Date().toString().split(" ");
        let countTime = Number(pOpts.duration);
        let countDownDate = new Date(today[2] + " " + today[1] + " " + today[3] + " " + pOpts.refTime).getTime() + countTime*60000;
        // Update the count down every 1 second
        let x = setInterval(function() {

        // Get today's date and time
        let now = new Date().getTime();
            
        // Find the distance between now and the count down date
        let distance = countDownDate - now;
            
        // Time calculations for days, hours, minutes and seconds
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Output the result in an element with id="demo"
        setMinSec([minutes,seconds]);

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            setOver(true);
            props.timesUpAction()
        }
        }, 1000);
    },[])
    let colorScheme = ["#fff","#000"];
    if(props.color){
        colorScheme = props.color;
    }
    return(
        <div className="CountdownWrapper">
            {!over?minSec?
                <div style={{backgroundColor:colorScheme[0]}} className="CountdownBlock">    
                    <div style={{backgroundColor:colorScheme[1]}} className="CountdownSubBlock">
                        <h4 id="CountdownMin">{minSec[0]}</h4>
                        <p>Min</p>
                    </div>
                    <div style={{backgroundColor:colorScheme[1]}} className="CountdownSubBlock">
                        <h4 id="CountdownSec">{minSec[1]}</h4>
                        <p>Sec</p>
                    </div>
                </div>
            :null:<div className="CountdownExpired">TIME's UP</div>}
        </div>
    );
}

export default Countdown;




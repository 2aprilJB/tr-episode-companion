import React from 'react';
import classes from './Footer.module.css';
import LWDN from '../Assets/LWDN/LWDN';
import StyledBreak from './StyledBreak/StyledBreak';

const footer = (props)=>{
    let aboutButtClickHandler = ()=>{
        props.history.push('/about');
    }
    let style = {};
    props.shadowTop?style = {
        boxShadow: '0px -4px 25px  rgba(255, 255, 255, 0.527)',
    }: style = null;
    return(
        <div style = {style} className = {classes.Footer}>
            <h2 className = {classes.LinttHere}>Lintt HERE</h2>
            <h3 className = {classes.Motto}>Making happenings Happen</h3>

            <p className = {classes.MottoExplainer}>Our Small attempt To restore the sociality That got disturbed by this modern world of<br/>SCREENS</p>
            
            <StyledBreak divColor = {'#ff414d'} lineWidth = {30} />

            <p className = {classes.Intro}>Scratched and Maintained<br/>BY</p>
            <div className = {classes.LwdnLogo}>
                <LWDN />
            </div>
            <div className = {classes.Stick}></div>
            <div className = {classes.AboutContact}>
                <div className = {classes.AboutButt}>
                    <button onClick = {()=>alert('You will Come to know soon..')} className = {classes.About}>ABOUT</button>
                </div>

                <div className={classes.InstaContact}>
                    <h3>TO KNOW MORE<br/>WHATS HAPPENING..<br/>FOLLOW US..</h3>
                    <a href='https://www.instagram.com/treasureroyalelintt00/' className={classes.InstaIcon}><ion-icon name="logo-instagram"></ion-icon></a>
                    <p className={classes.LinttLookout}>!!   Lintt is always on the LOOKOUT  !!</p>
                </div>

            </div>
        </div>
    );
}

export default footer;
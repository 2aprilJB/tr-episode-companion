import React from "react";
// import NavBarFix from "./NavBarFix/NavBarFix";
import IntroInfo from './IntroInfo/IntroInfo';
import SlideShowcase from "./SLideShow/SlideShowcase";
// import Menu from './NavBarFix/Menu/Menu';
import ArTech from "./ArTech/ArTech";
import './Landing.css';
import { Component } from "react";

class NewMay extends Component{
    state = {
        infoShowcase: ['https://th.bing.com/th/id/OIP.4YCFKCKnBstxpzZ5yz5FqQHaE8?pid=ImgDet&rs=1'],
        showMenu : false,
        menuLinks : [
            ['PARTICIPATION','https://treasureroyale-lintt.web.app'],
            ['EVENTS','https://treasureroyale-lintt.web.app'],
            ['TR Companion APP','https://treasureroyale-lintt.web.app'],
            ['MORE','https://treasureroyale-lintt.web.app']
        ]
    }
    

    // showMenuHandler = ()=>{
    //     this.setState({showMenu:!this.state.showMenu});
    //     console.log('So the menu was clicked ' + this.state.showMenu);  
    // }

    render(){
        return(
                <div className="MainContainer">

                {/* <NavBarFix showMenuHandler = {this.showMenuHandler}></NavBarFix>
                <Menu links = {this.state.menuLinks} showMenu = {this.state.showMenu} showMenuHandler = {this.showMenuHandler}></Menu> */}
                
                <IntroInfo infoShowcaseImg = {this.state.infoShowcase[0]} />

                <div className="PageNav">
                    <div className="ToSection">1</div>
                    <div className="ToSection">3</div>
                    <div className="ToSection">2</div>
                </div>

                <p className="IntroBrief">
                    An AR based semi-mobile game 
                    <br/>that is meant to offer the
                    <br/>rich experience of the BATTLE ROYALE</p>
                
                <ArTech/>

                <SlideShowcase/>
                {/*


                <div className="SlideShowcase">
                    <div className="ShowcaseTagline"></div>
                    <div className="Events"></div>
                    <div className="TheApp"></div>
                </div> */}
            </div>
        );
    }
}


export default NewMay;
import React from "react";
// import NavBarFix from "./NavBarFix/NavBarFix";
import IntroInfo from './IntroInfo/IntroInfo';
import SlideShowcase from "./SLideShow/SlideShowcase";
// import Menu from './NavBarFix/Menu/Menu';
import ArTech from "./ArTech/ArTech";
import './Landing.css';
import { Component } from "react";
import Showcase from "../Containers/Showcase/Showcase";
import TheQuote from "./TheQuote/TheQuote";

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

                {/* <div className="PageNav">
                    <div className="ToSection">1</div>
                    <div className="ToSection">3</div>
                    <div className="ToSection">2</div>
                </div> */}

                <Showcase top>
                    <p className="IntroBrief">
                        An AR based semi-mobile game 
                        <br/>that is meant to offer the
                        <br/>rich experience of the BATTLE ROYALE
                    </p>
                    <p className="IntroBrief">
                        The FUSION of two great concepts..
                        <br/>Treasuer Hunt
                        <br/>Battle Royale
                    </p>
                </Showcase>
                
                <ArTech/>

                <SlideShowcase/>

                <TheQuote/>
                
            </div>
        );
    }
}


export default NewMay;
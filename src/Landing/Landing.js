import React from "react";
// import NavBarFix from "./NavBarFix/NavBarFix";
import IntroInfo from './IntroInfo/IntroInfo';
import SlideShowcase from "./SLideShow/SlideShowcase";
// import Menu from './NavBarFix/Menu/Menu';
import ArTech from "./ArTech/ArTech";
import './Landing.css';
import { Component } from "react";
import Showcase from "../Containers/Showcase/Showcase";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import HeroDisplay from "../TrEpisodeCompanion/HeroDisplay/HeroDisplay";
import TheQuote from "./TheQuote/TheQuote";
import axios from "axios";

class NewMay extends Component{
    state = {
        infoShowcase: ['https://cdn.wallpapersafari.com/21/41/QHdoWh.jpg','https://thumbs.dreamstime.com/b/businessmen-businesswomen-performing-group-activity-creative-office-65404221.jpg','https://livewallp.com/wp-content/uploads/2020/12/Cosmic-Wolf-640x360.jpg'],
        showMenu : false,
        menuLinks : [
            ['PARTICIPATION','https://treasureroyale-lintt.web.app'],
            ['EVENTS','https://treasureroyale-lintt.web.app'],
            ['TR Companion APP','https://treasureroyale-lintt.web.app'],
            ['MORE','https://treasureroyale-lintt.web.app']
        ],
        videoIds: []
    }
    

    componentDidMount(){
        axios.get(this.props.baseUrl.staticBase + '/billBoards.json')
             .then(resp=>{
                this.setState({
                    videoIds: [resp.data.youtube1,resp.data.youtube2]
                })
             })
             .catch(err=>{
                console.log(err);
                alert('Network Issue is fucking it all upp')
             })
    }
    // showMenuHandler = ()=>{
    //     this.setState({showMenu:!this.state.showMenu});
    //     console.log('So the menu was clicked ' + this.state.showMenu);  
    // }
    render(){

        return(
                <div className="LandingMainContainer">

                {/* <NavBarFix showMenuHandler = {this.showMenuHandler}></NavBarFix>
                <Menu links = {this.state.menuLinks} showMenu = {this.state.showMenu} showMenuHandler = {this.showMenuHandler}></Menu> */}
                
                <IntroInfo infoShowcaseImg = {this.state.infoShowcase[0]} />

                {/* <div className="PageNav">
                    <div className="ToSection">1</div>
                    <div className="ToSection">3</div>
                    <div className="ToSection">2</div>
                </div> */}

                {/* <Showcase top>
                    <p className="IntroBrief">
                        An AR based semi-mobile game 
                        <br/>that is meant to offer the
                        <br/>rich experience of the BATTLE ROYALE
                    </p>
                    <p className="IntroBrief">
                        The FUSION of two great concepts..
                        <br/>Treasure Hunt
                        <br/>Battle Royale
                    </p>
                </Showcase> */}
                <HeroDisplay baseUrl = {this.props.baseUrl.staticBase + 'billBoards/homePage'} />
                
                <LeaderBoard leaderBoardName = {"OCTOBER - FEST"} ptsOcoins = {"Coins"} baseUrl = {this.props.baseUrl.dynamicBase3 + 'points.json'}/>

                <ArTech videoIds = {this.state.videoIds} />

                <SlideShowcase baseUrl = {this.props.baseUrl}/>

                <TheQuote/>
                
            </div>
        );
    }
}


export default NewMay;
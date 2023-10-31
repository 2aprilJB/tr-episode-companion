import React from "react";
import "./TrEpisode.css"
import { Component } from "react";
import Loader from "../../Assets/Loader/Loader";
import TeamBanner from "../../Assets/Images/teamBanner.png"
import ArtifactCheck from "./ArtifactCheck/ArtifactCheck";
import Modal from "../../Containers/Modal/Modal";
import HeroDisplay from "../HeroDisplay/HeroDisplay";
import HawkMode from "../HawkMode/HawkMode";
import ManagerMode from "../ManagerMode/ManagerMode";
import ShowPointsButt from "./UtilButtons/ShowPointsButt/ShowPointsButt";
import LogoutButt from "./UtilButtons/LogoutButt/LogoutButt";
import ShowChitsButt from "./UtilButtons/ShowChitsButt/ShowChitsButt";
import { getCoins } from "../../FireStoreUtils/FireStoreUtils";
import CoinsCollected from "./CoinsCollected/CoinsCollected";
import RiddleShop from "./RiddleShop/RiddleShop";
import axios from "axios";
import ActualChit from './ArtifactCheck/ActualChit/ActualChit';
import DummyChit from './ArtifactCheck/DummyChit/DummyChit';
import TheMap from "../../MapCvm/TheMap/TheMap";

class TrEpisode extends Component{
    state = {
        artifactsCodesUrl: this.props.baseUrl.dynamicBase1 + 'artifacts/',
        chitType: '-',
        showChit: false,
        bought: false,
        refreshBoat: false,
        colorScheme: ['#4FC0D0','#FF8989'],
        planeValidation: false,
        refreshPlane: false,
        loading: true,
        coinCount: [0,0], //this array implies: [indexOfCoinCountOfTeam, coinCountOfTeam]
        riddleBuyOptions: {},
        toValidateImgUrl: 
        [
            'https://img.freepik.com/premium-vector/paper-airplane-icon-comic-style-plane-vector-cartoon-illustration-white-isolated-background-air-flight-business-concept-splash-effect_157943-6349.jpg?w=2000',
            'https://w7.pngwing.com/pngs/297/776/png-transparent-paper-boat-paper-boat-origami-transport-ship.png'
        ],
    }
    componentDidMount(){
    
        this.setState({
            loading: false
        })

        axios.get(this.props.baseUrl.staticBase + '/storeOptions.json')
             .then(resp=>{
                this.setState({
                    riddleBuyOptions: resp.data.buyRiddlesOptions
                })
             })
             .catch(err=>{
                console.log(err);
                alert('A network isuue contact the desk');
             })
        
    }
    render(){
        let buyHandler =(typeOfChit)=>{
            if(typeOfChit==='i'){
                this.setState({
                    bought: true,
                    chitType: typeOfChit
                })
            }
            else{
                this.setState({
                    bought:true,
                    chitType: typeOfChit
                })
            }
                
        }
        
        let onBoatRefresh=()=>{
            if(window.confirm('Are you Sure you want to refresh the riddle? This riddle will be Lost !!')){
                console.log('Boat REfreshed')
                this.setState({
                    bought: false,
                    refreshBoat: true
                })
            }
            else{
                console.log('Refresh of Boat Cancelled');
            }
        }
        let boatRefreshed=()=>{
            this.setState({
                refreshBoat: false
            })
        }
        

        let showChitCount = (showOrNot)=>{
            this.setState({
                showChit:showOrNot
            })
        }
        let updateCoinState = (updatedCoins)=>{  //To update coinCount in our main TREpisode's state
            this.setState({
                coinCount: updatedCoins
            })
        }
        

        let UserMode =                     //Assigning UserMode Part to one variable
        <div className="UserMode">
            {/*Artifact - I : Five Check*/}
            <div className="BoatSection">
                <ArtifactCheck storeOptions = {this.props.storeOptions} coinCount = {this.state.coinCount[1]} refresh = {this.state.refreshBoat} refreshed = {boatRefreshed} baseUrl = {this.props.baseUrl}   
                codeValidBaseUrl = {this.state.artifactsCodesUrl} toValidateImgUrl = {this.state.toValidateImgUrl[0]} activeTeam = {this.props.activeTeam}
                buyHandler = {buyHandler} validationLimit = {2} bought = {this.state.bought}
                stateCoins = {this.state.coinCount} updateCoinState = {updateCoinState}
                onRefreshClick = {onBoatRefresh} chitType = {this.state.chitType}/>
            </div>
            
        </div>


        return(
            <div className="TrEpisodeMainContainer">
                {this.state.loading?<Loader loaded = {false} />:<Loader loaded = {true}/>}
                
                <ShowChitsButt showChit = {this.state.showChit} showChitCount = {showChitCount} baseUrl = {this.props.baseUrl} />
                
                <div className="TeamDetails">
                    {/* <img className="TeamBanner" src={TeamBanner}></img> */}
                    <h5>TEAM</h5>
                    <h3 className="TeamCode">{this.props.activeTeam}</h3>
                </div>
                
                <ShowPointsButt activeTeam = {this.props.activeTeam} baseUrl = {this.props.baseUrl}/>
                <h3 className="CoinsHead">TR COINS</h3>
                <div className="CoinsCollectedWrapper">
                    <p className="AboutCoins1"><ion-icon name="scan-circle"></ion-icon></p>
                    <CoinsCollected baseUrl = {this.props.baseUrl} stateCoins = {this.state.coinCount} updateCoinState = {updateCoinState} activeTeam = {this.props.activeTeam}/>
                    <p className="AboutCoins1"><ion-icon name="scan-circle"></ion-icon></p>
                </div>

                {this.props.activeTeam.split("").length===1||this.props.activeTeam.split("").length===3?
                    UserMode:
                    this.props.activeTeam==="Z0"?
                    <ManagerMode forAll = {false} draggedCoords = {this.props.draggedCoords} activeTeamCoords = {this.props.activeTeamCoords} baseUrl = {this.props.baseUrl}/>:
                    <HawkMode baseUrl = {this.props.baseUrl} activeChar = {this.props.activeTeam} />
                }

                <div className="TreasureMapContainer">
                    {/* <img className="MapWallPaper" src={treasureMapWallpaper}></img> */}
                    <div className="TMapContainer">
                        <TheMap secondaryProxy = {this.props.secondaryProxy} publicCoords = {this.props.publicCoords} draggedCoords = {this.props.draggedCoords} setDraggedCoords = {this.props.setDraggedCoords} setPublicCoordsForProxies ={this.props.setPublicCoordsForProxies} activeProxyZoneHandler = {this.props.activeProxyZoneHandler} activeProxyZone ={this.props.activeProxyZone} activeTeamCoords = {this.props.activeTeamCoords} activeTeam = {this.props.activeTeam} baseUrls = {this.props.baseUrl} />
                    </div>
                    
                </div>
                <div className="BackToMapContainer">
                        <div className="BackToHome">
                        <a style={{marginTop:"0.4rem"}} href="/mapCVM"><ion-icon name="expand-outline"></ion-icon></a>
                        </div>
                        <h3 className="ButtText2">Back</h3>
                </div>
                
                {/*Alert Module, works currently on refresh click*/}

                {/* Lets buy some Riddles */}
                {this.state.riddleBuyOptions?<RiddleShop 
                activeProxyZone = {this.props.activeProxyZone}
                buyHandler = {buyHandler} 
                activeTeam = {this.props.activeTeam} 
                coinCount = {this.state.coinCount}
                bought = {this.state.bought}
                baseUrl = {this.props.baseUrl} updateCoinState = {updateCoinState}
                buyOpts = {this.state.riddleBuyOptions} />:null}

                {/* <div style={{position: "relative",width: "100%"}}><img className="ArtifactCheckBanner" src = {ArtifactCheckBanner}></img></div> */}
                
                <h4 className="ChitTypeHeading">Type - {this.state.chitType.toUpperCase()}</h4>
                <div className="ChitContainer">
                    {this.state.bought?<ActualChit chitType = {this.state.chitType} activeTeam = {this.props.activeTeam} baseUrl = {this.props.baseUrl.dynamicBase2}/>:<DummyChit/>}
                </div>
                <div className="RefreshDiv">
                    Press This
                    <button onClick={onBoatRefresh} className="RefreshCollection">
                        <ion-icon name="reload-circle-outline"></ion-icon>
                    </button>
                    To Refresh
                </div>
                
                
                <HeroDisplay baseUrl = {this.props.baseUrl.staticBase + 'billBoards/gamePage'}/>
                
                <div style={{position:'relative',marginTop: '4rem'}}>
                    <LogoutButt logoutHandler = {()=>this.props.logoutHandler(this.props.loggedIn)} />
                </div>
                
            </div>
        );
    }
}

export default TrEpisode;

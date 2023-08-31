import React from "react";
import "./TrEpisode.css"
import { Component } from "react";
import Loader from "../../Assets/Loader/Loader";
import ChitCount from "../ChitCount/ChitCount";
import ArtifactCheck from "./ArtifactCheck/ArtifactCheck";
import Modal from "../../Containers/Modal/Modal";
import HeroDisplay from "../HeroDisplay/HeroDisplay";
import HawkMode from "../HawkMode/HawkMode";
import ManagerMode from "../ManagerMode/ManagerMode";
import { getCoins } from "../../FireStoreUtils/FireStoreUtils";
import CoinsCollected from "./CoinsCollected/CoinsCollected";
import UseCoins from "./UseCoins/UseCoins";
import axios from "axios";
import AlertModule from "../AlertModule/AlertModule";

class TrEpisode extends Component{
    state = {
        artifactsCodesUrl: this.props.baseUrl + 'artifacts/boats',
        chitType: '-',
        showChit: false,
        bought: false,
        refreshBoat: false,
        colorScheme: ['#4FC0D0','#FF8989'],
        planeValidation: false,
        refreshPlane: false,
        loading: true,
        coinCount: 0,
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
    }
    render(){
        let buyHandler =(typeOfChit)=>{
            let tempUrl = this.state.artifactsCodesUrl;
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
        let showPoints = (activeTeam)=>{
            axios.get(this.props.baseUrl + '/points.json')
                 .then(resp=>{
                    alert("Your team's points : " + resp.data[activeTeam]);
                 })
                 .catch(err=>{
                    console.log(err);
                    alert("Uff Ye Network errors");
                 })
        }

        let UserMode =                     //Assigning UserMode Part to one variable
        <div className="UserMode">
            {/*Artifact - I : Five Check*/}
            <div className="BoatSection">
                <ArtifactCheck coinCount = {this.state.coinCount} refresh = {this.state.refreshBoat} refreshed = {boatRefreshed} baseUrl = {this.props.baseUrl}   
                codeValidBaseUrl = {this.state.artifactsCodesUrl} toValidateImgUrl = {this.state.toValidateImgUrl[0]} activeTeam = {this.props.activeTeam}
                buyHandler = {buyHandler} validationLimit = {2} bought = {this.state.bought}
                onRefreshClick = {onBoatRefresh} chitType = {this.state.chitType}/>
            </div>
            
        </div>


        return(
            <div className="TrEpisodeMainContainer">
                {this.state.loading?<Loader loaded = {false} />:<Loader loaded = {true}/>}
                {/*Logout button that resets Credentail's loggedIn Status*/}
                <div className="LogoutButtContainer">
                    <div onClick={()=>this.props.logoutHandler(this.props.loggedIn)} className="LogoutButt">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </div>
                    <h3 className="ButtText">LOGOUT</h3>
                </div>
                
                <div className="ShowChitContainer">
                    <div onClick={()=>showChitCount(true)} className="ShowChit">
                        <ion-icon name="checkbox-outline"></ion-icon>
                    </div>
                    <h3 className="ButtText">Show<br/>Chits</h3>
                </div>
                <Modal show = {this.state.showChit} onBackDrop = {()=>showChitCount(false)}>
                    {/*ChitCount Module*/}
                    <ChitCount/>
                </Modal>
                
                <div className="TeamDetails">
                    <h5>TEAM</h5>
                    <h3 className="TeamCode">{this.props.activeTeam}</h3>
                </div>
                <AlertModule/>
                <div className="ShowMapContainer">
                    <div className="ShowMap">
                        <a href='/mapCVM'><ion-icon name="map-outline"></ion-icon></a>
                    </div>
                    <h3 className="ButtText">Show<br/>Map</h3>
                </div>
                <div className="ShowPointsContainer">
                    <div onClick={()=>showPoints(this.props.activeTeam)} className="ShowPoints">
                        <ion-icon name="checkmark-done-circle-outline"></ion-icon>
                    </div>
                    <h3 className="ButtText">Show<br/>Points</h3>
                </div>

                <h3 className="CoinsHead">TR COINS</h3>
                <div className="CoinsCollectedWrapper">
                    <p className="AboutCoins1"><ion-icon name="scan-circle"></ion-icon></p>
                    <CoinsCollected updateCoinState = {updateCoinState} activeTeam = {this.props.activeTeam}/>
                    <p className="AboutCoins1"><ion-icon name="scan-circle"></ion-icon></p>
                </div>
                {/*Alert Module, works currently on refresh click*/}

                {/* Lets buy some Riddles */}
                <UseCoins buyHandler = {buyHandler} 
                activeTeam = {this.props.activeTeam} 
                coinCount = {this.state.coinCount}
                bought = {this.state.bought} />


                
                    {this.props.activeTeam.split("").length===1?
                        UserMode:
                     this.props.activeTeam==="Z0"?
                        <ManagerMode baseUrl = {this.props.baseUrl}/>:
                        <HawkMode activeChar = {this.props.activeTeam}/>
                    }
                
                <HeroDisplay baseUrl = {this.props.baseUrl + 'billBoards/gamePage'}/>

            </div>
        );
    }
}

export default TrEpisode;
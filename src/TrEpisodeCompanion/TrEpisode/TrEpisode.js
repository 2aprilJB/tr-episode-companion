import React from "react";
import "./TrEpisode.css"
import { Component } from "react";
import Loader from "../../Assets/Loader/Loader";
import ChitCount from "../ChitCount/ChitCount";
import ArtifactCheck from "./ArtifactCheck/ArtifactCheck";
import Modal from "../../Containers/Modal/Modal";
import HeroDisplay from "../HeroDisplay/HeroDisplay";

class TrEpisode extends Component{
    state = {
        baseUrl: 'https://tr-episode-companion-default-rtdb.firebaseio.com/',  //Provide array like as follows: [["BLank",'Z'],["COdE",'Z']...]    
        showChit: false,
        boatValidation: false,
        refreshBoat: false,
        colorScheme: ['#4FC0D0','#FF8989'],
        planeValidation: false,
        refreshPlane: false,
        loading: true,
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
        let boatValidatedHandler =()=>{
            this.setState({
                boatValidation: true
            })
        }
        let planeValidatedHandler =()=>{
            this.setState({
                planeValidation: true
            })
        }
        let onBoatRefresh=()=>{
            if(window.confirm('Are you Sure you want to refresh the riddle? This riddle will be Lost !!')){
                console.log('Boat REfreshed')
                this.setState({
                    boatValidation: false,
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
        let onPlaneRefresh=()=>{
            if(window.confirm('Are you sure you want to refresh the riddle? This riddle will be Lost??')){
                console.log('Plane REfreshed')
                this.setState({
                    planeValidation: false,
                    refreshPlane: true
                })
            }
            else{
                console.log('Refresh of Planes Cancelled');
            }
        }
        let planeRefreshed=()=>{
            this.setState({
                refreshPlane: false
            })
        }

        let showChitCount = (showOrNot)=>{
            this.setState({
                showChit:showOrNot
            })
        }
        let ArtifactsCodesUrl = this.state.baseUrl + 'artifacts';
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
                    <h3 className="ButtText">Show<br/   >Chits</h3>
                </div>
                <Modal show = {this.state.showChit} onBackDrop = {()=>showChitCount(false)}>
                    {/*ChitCount Module*/}
                    <ChitCount/>
                </Modal>
                
                <div className="TeamDetails">
                    <h5>TEAM</h5>
                    <h3 className="TeamCode">{this.props.activeTeam}</h3>
                </div>

                {/*Alert Module, works currently on refresh click*/}
                <HeroDisplay baseUrl = {this.state.baseUrl + 'billBoards/gamePage'}/>
            
                        {/*Artifact - I : Five Check*/}
                        <div className="BoatSection">
                            <ArtifactCheck refresh = {this.state.refreshBoat} refreshed = {boatRefreshed} baseUrl = {this.state.baseUrl} codeValidBaseUrl = {ArtifactsCodesUrl + '/boats'}  
                            toValidateImgUrl = {this.state.toValidateImgUrl[0]} activeTeam = {this.props.activeTeam}
                            ValidatedHandler = {boatValidatedHandler} validationLimit = {2} validationFull = {this.state.boatValidation}
                            onRefreshClick = {onBoatRefresh} chitType = {'i'}/>
                        </div>
                        
                        {/*Artifact - I : Three Check*/}
                        <div className="PlaneSection">
                            <ArtifactCheck refresh = {this.state.refreshPlane} refreshed = {planeRefreshed} baseUrl = {this.state.baseUrl} codeValidBaseUrl = {ArtifactsCodesUrl + '/planes'}  
                            toValidateImgUrl = {this.state.toValidateImgUrl[1]} activeTeam = {this.props.activeTeam}
                            ValidatedHandler = {planeValidatedHandler} validationLimit = {3} validationFull = {this.state.planeValidation}
                            onRefreshClick = {onPlaneRefresh} chitType = {'ii'}/>
                        </div>
            </div>
        );
    }
}

export default TrEpisode;
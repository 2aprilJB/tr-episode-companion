import React, { Component } from "react";
import axios from "axios";
import "./ManagerMode.css";
import AlertUpdate from "./AlertUpdate/AlertUpdate";
import CodeNull from "./CodeNull/CodeNull";
import AddUser from "./AddUser/AddUser";
import AddChit from "./AddChit/AddChit";
import AddArtifact from "./AddArtifact/AddArtifact";
import AddProxyZone from "./AddProxyZone/AddProxyZone";
import { sendCoordsSignal, updateAlertMsg } from "../../FireStoreUtils/FireStoreUtils";
import UpdateCoins from "./UpdateCoins/UpdateCoins";

class ManagerMode extends Component{
    state = {
        updateArtifactsCode: false
    }
    render(){
        let sB = this.props.baseUrl.staticBase;
        let updateArtifacts=()=>{
            if(window.confirm("You are making a terrible mistake if u dont know what you are doing..")){
                // if(prompt('Enter the Atomic PassCode: ')==='LinShaye'){
                    
                // }
                // else{}
                this.setState({
                    updateArtifactsCode:true
                  })
            }
            else{}
        }
        let hideAllProxies=()=>{
            let pc1 = '';
            let pc2 = '';
            if(window.confirm("You are making a terrible mistake if u dont know what you are doing..")){
                let hideOrNot = prompt('Hide or Unhide');
                if(hideOrNot==='Hide'){
                    updateAlertMsg('Danger Zone is going to be activated')
                    pc1 = 'publicCoords.json';
                    pc2 = 'tempPublicCoords.json';
                }
                else if(hideOrNot==='Unhide'){
                    updateAlertMsg('Danger Zone Deactivated')
                    pc2 = 'publicCoords.json';
                    pc1 = 'tempPublicCoords.json';
                }
                else{}
                if(pc1!==''||pc2!=='')
                    axios.get(sB + pc1)         
                        .then(resp=>{
                            axios.put(sB + pc2,resp.data)  //Firstly copying current publicCoords to temp,on staticBase
                                .then(response=>{
                                    resp.data.polygons.charProxies.length = 1;        //Deleting all the proxies for zones
                                    axios.put(sB + pc1,resp.data) //Updating current pubblicCoords with deleted proxy zones
                                        .then(res=>{
                                            sendCoordsSignal();   //Sending signal to firestore so all devices can get snapshot and Update ProxyZone state
                                            
                                        })
                                        .catch(err=>{
                                            console.log(err);  
                                            alert("Network Manager ye tune kya kiyaa....");
                                            })
                                })
                                .catch(err=>{
                                    console.log(err);
                                    alert("Network Manager ye tune kya kiyaa....");
                                })
                        })
            }
            else{}
        }
        return(
            <div className="ManagerContainer">
                <h2 className="ManagerTitle">MR. Manager</h2>
                <AlertUpdate/>
                <AddUser baseUrl = {this.props.baseUrl}/>
                <AddChit baseUrl = {this.props.baseUrl.dynamicBase2}/>
                <AddArtifact activeTeamCoords = {this.props.activeTeamCoords} forAll = {this.props.forAll} draggedCoords = {this.props.draggedCoords} baseUrl = {this.props.baseUrl.dynamicBase1}/>
                <AddProxyZone forAll = {this.props.forAll} draggedCoords = {this.props.draggedCoords} baseUrl = {this.props.baseUrl.staticBase} />
                <UpdateCoins baseUrl = {this.props.baseUrl} />
                <div className="DangerButt" onClick={hideAllProxies}><ion-icon name="color-filter-outline"></ion-icon></div>
                <div className="DangerButt" onClick={updateArtifacts}><ion-icon name="warning-outline"></ion-icon></div>
                {this.state.updateArtifactsCode?<CodeNull baseUrl = {this.props.baseUrl} />:null}
            </div>
        );
    }
}

export default ManagerMode
import React, { Component } from "react";
import './ShowProxyZones.css';
import Modal from "../../../../Containers/Modal/Modal";
import ProxyZone from "./ProxyZone/ProxyZone";
import axios from "axios";

class ShowProxyZones extends Component{
    state = {
        showZones: false,
        proxyZones: []
    }
    componentDidMount(){
        axios.get(this.props.baseUrl)
             .then(resp=>{
                this.setState({
                    proxyZones: resp.data
                })
             })
             .catch(err=>{
                console.log(err);
                alert('Network Error has done things terrible for our CEO');
             })
    }


    onDeleteHandler(indexOfArtifact){
        if(indexOfArtifact!==0){
            let latestArtifacts = []
            if(window.confirm('Are You sure to Delete this Artifact??')){
                axios.get(this.props.baseUrl)
                .then(resp=>{
                    latestArtifacts = resp.data;
                    latestArtifacts.splice(indexOfArtifact,1) //Removing artifact 
                    this.setState({
                        proxyZones:latestArtifacts,
                        showZones:false //Closing ShowArtifacts to let the user refresh by opening it again
                    })
                    axios.put(this.props.baseUrl,latestArtifacts)
                        .catch(err=>{
                            console.log(err);
                            alert('There is just another Network ERror')
                        })
                })
                .catch(err=>{
                    console.log(err);
                    alert('Network Error has done things terrible for our CEO');
                })
            }
            else{}
        }
        else{
            alert('Hey hey hey!! You retard wanna break this application, you can not delete this Moron!!');
        }
    }
    render(){
        let showZones = (showOrNot)=>{
            axios.get(this.props.baseUrl)
             .then(resp=>{
                this.setState({
                    proxyZones: resp.data,
                    showZones:showOrNot
                })
             })
             .catch(err=>{
                console.log(err);
                alert('Network Error has done things terrible for our CEO');
             })
        }
        let proxyZones = this.state.proxyZones;
        return(
            <div className="ShowProxyZoneWrapper">
                {this.state.showZones?<Modal show = {this.state.showZones} onBackDrop = {()=>showZones(false)}>
                    <div style={{width:"100%",height: "30rem"}}>{proxyZones?proxyZones.map((ele,ind)=>{
                        return <ProxyZone key = {'ProxyZone' + ind} onDeleteHandler = {()=>this.onDeleteHandler(ind)} proxyZoneDet = {ele} />
                    }):null}
                    </div></Modal>:null}
                <button onClick={()=>showZones(true)} className="ShowButt"><ion-icon name="bonfire-outline"></ion-icon></button>
            </div>
        );
    }
}


export default ShowProxyZones;
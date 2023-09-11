import React, { Component } from "react";
import './ShowSpecArtifacts.css';
import Modal from "../../../../Containers/Modal/Modal";
import axios from "axios";
import SpecArtifact from "./SpecArtifact/SpecArtifact";
import { deleteArtifactFromFs } from "../../../../FireStoreUtils/FireStoreUtils";

class ShowSpecArtifacts extends Component{
    state = {
        planeBase: this.props.baseUrl + 'artifacts/planes.json',
        showArtifacts: false,
        specArtifacts: []
    }
    componentDidMount(){
        axios.get(this.state.planeBase)
             .then(resp=>{
                this.setState({
                    specArtifacts: resp.data
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
                axios.get(this.state.planeBase)
                .then(resp=>{
                    deleteArtifactFromFs(resp.data[indexOfArtifact][0]); //Deleting Artifcat from Firestore Server
                    latestArtifacts = resp.data;
                    latestArtifacts.splice(indexOfArtifact,1) //Removing artifact 
                    this.setState({
                        specArtifacts:latestArtifacts,
                        showArtifacts:false //Closing ShowArtifacts to let the user refresh by opening it again
                    })
                    axios.put(this.state.planeBase,latestArtifacts)
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
        let showArtifacts = (showOrNot)=>{
            axios.get(this.state.planeBase)
             .then(resp=>{
                this.setState({
                    specArtifacts: resp.data,
                    showArtifacts:showOrNot
                })
             })
             .catch(err=>{
                console.log(err);
                alert('Network Error has done things terrible for our CEO');
             })
        }
        let specArt = this.state.specArtifacts;
        return(
            <div className="ShowSpecArtifactsWrapper">
                {this.state.showArtifacts?<Modal show = {this.state.showArtifacts} onBackDrop = {()=>showArtifacts(false)}>
                    {specArt?specArt.map((ele,ind)=>{
                        return <SpecArtifact key={ind} onDeleteHandler = {()=>this.onDeleteHandler(ind)} artifactCode = {ele[0]} foundBy = {ele[1]} />
                    }):null}
                </Modal>:null}
                <button onClick={()=>showArtifacts(true)} className="ShowButt"><ion-icon name="bonfire-outline"></ion-icon></button>
            </div>
        );
    }
}


export default ShowSpecArtifacts;
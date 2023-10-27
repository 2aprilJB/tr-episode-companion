import React from "react";
import { Component } from "react";
import "./AddArtifact.css";
import EnterData from "../AddUser/EnterData/EnterData";
import { addArtifactToFs } from "../../../FireStoreUtils/FireStoreUtils";
import axios from "axios";
import ShowSpecArtifacts from "./ShowSpecArtifacts/ShowSpecArtifacts";


class AddArtifact extends Component{
    state = {
        currValue : {
            currArtifact:'',
            currCode:''
        }
    }

    
    render(){

        let onClickHandler = ()=>{
            let newArtifact = [];
            let artifactCode = this.state.currValue.currCode;
            let dCoords = this.props.draggedCoords;
            dCoords = [dCoords[0]+0.00002,dCoords[1]]
            newArtifact = this.props.forAll?[this.props.activeTeamCoords,false]:[dCoords,false];
            if(window.confirm("Are You Sure to Add this Artifact??") && newArtifact[0].length!==1){
                axios.get(this.props.baseUrl + 'artifacts/planes.json')
                     .then(resp=>{
                        let tempPlanes = resp.data;
                        let idOfArtifact = tempPlanes.length;
                        addArtifactToFs(newArtifact,artifactCode,idOfArtifact);
                        tempPlanes = [...tempPlanes,[artifactCode,'Z','0000']];
                        axios.put(this.props.baseUrl + 'artifacts/planes.json',tempPlanes)
                             .catch(err=>{
                                console.log(err);
                                alert('Network Error has caught up')
                             })
                     })
                     .catch(err=>{
                        console.log(err);
                        alert('Network error has caught up!!');
                     })
            }
            else{
                alert("You might've entered wrong format for Coords or something else");
            }
        }
        
        let onArtifactChangeHandler = (e,currVal,currValueInd)=>{
            currVal = e.target.value;
            let prevVal = this.state.currValue;
            prevVal[currValueInd] = currVal
            this.setState({
                currValue: prevVal
            })
        }
        return(
            <div className="AddWrapper">
                <ShowSpecArtifacts baseUrl = {this.props.baseUrl + 'artifacts/planes.json'}/>
                <h4 className="AddUsersHead">Add Artifact</h4>
                {/* <EnterData onChangeHandler = {onArtifactChangeHandler} currValIn = {'currArtifact'} currValue = {this.state.currValue.currArtifact} enterWhat = "Coords"/> */}
                <EnterData onChangeHandler = {onArtifactChangeHandler} currValIn = {'currCode'} currValue = {this.state.currValue.currCode} enterWhat = "ArtifactCode"/>
                <button className="SubmitUser" onClick={onClickHandler}><ion-icon name="caret-forward-outline"></ion-icon></button>
            </div>
        );
    }
}

export default AddArtifact;
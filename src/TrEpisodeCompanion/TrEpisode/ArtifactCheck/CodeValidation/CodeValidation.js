import React from "react";
import "./CodeValidation.css"
import axios from 'axios';
import { Component } from "react";
import { updateArtifactToFs, updateCoins } from "../../../../FireStoreUtils/FireStoreUtils";

class CodeValidation extends Component{

    state = {
        baseUrl: null,
        isThereError: false,
        disableSubmit: false,
        currCode: ''
    }
    updateTrCoinsBackup(teamCode,coinCount){
        axios.put(this.props.trCoinsBackUpUrl + 'backUpTrCoins/' + this.props.stateCoins[0] + '/1.json',coinCount)
             .then(resp=>{
                let tempCoins = this.props.stateCoins;
                tempCoins[1] = coinCount;
                this.props.updateCoinState(tempCoins)
             })
             .catch(err=>{
                console.log(err);
                alert("There's some serious Network Error");
             })
    }
    onChangeHandler = (e)=>{
        let temp = e.target.value;
        this.setState({
            currCode: temp
        })
    }
    onSubmitHandler(currentCode){
        this.setState({
            disableSubmit: true //Disabling Submit button till the response from request arrives
        });
        axios.get(this.props.baseUrl + '.json')
            .then(response=>{
                
                this.setState({
                    disableSubmit: false  //Enabling Submit Button as the response Arrived 
                });
                
                let artifacts = response.data;
                let boats = artifacts.boats;
                let planes = artifacts.planes;
                artifacts = boats.concat(planes);
                let artifactType = 'boats';

                // let specialArtifacts = response.data.planes;
                let foundArtifactAt = 0;
                let foundAlready = false;
                artifacts.map((ele,index)=>{
                    if(currentCode===ele[0]&&ele[1]==='Z'){
                        alert('Code Found')     // Here we'll do Firestore Coin Collection
                        let updatedCoins = 0
                        if(index<boats.length){ // When the artifact found belongs to BoatsArray

                            updatedCoins = this.props.coinCount + this.props.storeOptions.awardCoins[0]; //Adding the More coins as per DB to the current coins
                            foundArtifactAt = index;

                        }
                        else{                   // When the artifact found belongs to PlanesArray

                            updatedCoins = this.props.coinCount + this.props.storeOptions.awardCoins[1]; //Adding the More coins as per DB to the current coins
                            foundArtifactAt = index-boats.length;
                            artifactType = 'planes';

                            updateArtifactToFs(currentCode);

                        }
                        // updateCoins(this.props.activeTeam,updatedCoins); //This function was to update Firestore
                        this.updateTrCoinsBackup(this.props.activeTeam,updatedCoins);  //This function is updating State as well as our rtdb, in dynamicBase-4

                    }
                    else if(currentCode===ele[0]&&ele[1]!='Z'){
                        alert('Code Already Found');
                        foundAlready = true;
                    }
                    else{}
                    return(foundArtifactAt);
                })
                if(foundAlready){
                    console.log('Item Already Found')
                }    
                else if(artifacts[foundArtifactAt][0] === "Blank"){
                    alert('Wrong Code');
                }

                let newArtifact = response.data[artifactType][foundArtifactAt]; //newArtifact, Copy of Found Artifact
                newArtifact[1] = this.props.activeTeam;       //Storing Team Code with Artifact's Code

                if(foundArtifactAt===0)                       //newArtifact will now be updated to the server
                    {}                                        
                else{
                    axios.put(this.props.baseUrl + artifactType + '/' + foundArtifactAt + '.json',newArtifact)
                    .catch(err=>{
                        console.log(err);
                        this.setState({
                            isThereError: true
                        })
                        alert('Something is Wrong with the Network');
                    })
                }
            })
            .catch(err=>{
                console.log(err);
                this.setState({
                    isThereError: true
                })
                alert('Something is Wrong with the Network');
            })
            
    }

    

    componentDidUpdate(){
        if(this.props.refresh){
            console.log('Here for refresh  ' + this.state.validated);
            this.setState({
                validated: 0,
                bought: false,
                disableSubmit: false,
            });
            this.props.refreshed();
        }
        else{}
    }
    render(){
        
        let submitButton = <button onClick={()=>this.onSubmitHandler(this.state.currCode)} className="codeSubmit"><ion-icon name="arrow-forward-outline"></ion-icon></button>
        if(this.state.disableSubmit)
            submitButton = null;
        else{}
        return(
            <div className="CValidContainer">
                <div className="CodeValidationContainer">
                    <div className="CodeValidationHeader">
                        <h3 style={{fontSize: "1.8rem",paddingTop: "0.8rem"}} className="CoinsHead">FIND</h3>
                        <div className="Item" style={{"backgroundImage":"url(" + this.props.toValidateImgUrl + ")"}}></div>
                        <h3 style={{fontSize: "1.8rem",paddingTop: "0.8rem"}} className="CoinsHead">COINS</h3>
                    </div>
                    <div className="EnterCode">
                        <h6 className="Enter">Enter CODE :</h6>
                        <input onChange={this.onChangeHandler} type = "text" className="CodeInput"></input>
                        {submitButton}
                    </div>
                </div>
            </div>
        );
    }
}

export default CodeValidation;
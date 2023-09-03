import React from "react";
import "./CodeValidation.css"
import axios from 'axios';
import { Component } from "react";
import { updateCoins } from "../../../FireStoreUtils/FireStoreUtils";

class CodeValidation extends Component{

    state = {
        baseUrl: null,
        isThereError: false,
        disableSubmit: false
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
                let foundArtifactAt = 0;
                let foundAlready = false;
                artifacts.map((ele,index)=>{
                    if(currentCode===ele[0]&&ele[1]==='Z'){
                        alert('Code Found')     // Here we'll do Firestore Coin Collection
                        let updatedCoins = this.props.coinCount + this.props.storeOptions.awardCoins; //Adding the More coins as per DB to the current coins
                        updateCoins(this.props.activeTeam,updatedCoins);

                        foundArtifactAt = index;
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
                else if(artifacts[foundArtifactAt][0] === "Blank")
                    alert('Wrong Code');
                let newArtifact = artifacts[foundArtifactAt]; //newArtifact, Copy of Found Artifact
                newArtifact[1] = this.props.activeTeam;       //Storing Team Code with Artifact's Code

                if(foundArtifactAt===0)                       //newArtifact will now be updated to the server
                    {}                                        
                else{
                    axios.put(this.props.baseUrl + '/' + foundArtifactAt + '.json',newArtifact)
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
        
        let currentCode = null;
        let onChangeHandler = (e)=>{
            currentCode = e.target.value;
        }
        let validated = this.state.validated;
        let submitButton = <button onClick={()=>this.onSubmitHandler(currentCode)} className="codeSubmit"><ion-icon name="arrow-forward-outline"></ion-icon></button>
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
                        <input onChange={onChangeHandler} type = "text" className="CodeInput"></input>
                        {submitButton}
                    </div>
                </div>
            </div>
        );
    }
}

export default CodeValidation;
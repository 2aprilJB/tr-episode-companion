import React from "react";
import "./CodeValidation.css"
import axios from 'axios';
import { Component } from "react";

class CodeValidation extends Component{

    state = {
        baseUrl: null,
        validated: 0,
        fullValidation: false,
        isThereError: false,
        disableSubmit: false
    }
    validationHandler(){
        
        let tempValid = this.state.validated + 1;
        let limit = this.props.validationLimit;
        if(tempValid<=limit)
            this.setState({
                validated: tempValid
            })
        else{} 
        if(tempValid===limit){   
            this.setState({
                fullValidation: true
            })
            this.props.ValidatedHandler();
        }
        else{}
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
                        this.validationHandler();
                        alert('Code Found')
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

                if(foundArtifactAt===0)
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
                fullValidation: false,
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
                    <div className="Item" style={{"backgroundImage":"url(" + this.props.toValidateImgUrl + ")"}}></div>
                    <div className="EnterCode">
                        <h6 className="Enter">Enter CODE :</h6>
                        <input onChange={onChangeHandler} type = "text" className="CodeInput"></input>
                        {this.state.fullValidation?null:submitButton}
                    </div>
                </div>
                <div className="Validation"> {/* If code gets valid, validation ticks here. */}
                    {Array(validated).fill("")
                        .map((ele,ind)=><div key={validated + ind} className="Valid"><ion-icon name="checkmark-done-outline"></ion-icon></div>)}
                </div>
                
            </div>
        );
    }
}

export default CodeValidation;
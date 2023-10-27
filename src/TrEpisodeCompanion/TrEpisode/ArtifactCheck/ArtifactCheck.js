import React, { Component } from "react";
import CodeValidation from "./CodeValidation/CodeValidation";
import ActualChit from "./ActualChit/ActualChit";
import DummyChit from "./DummyChit/DummyChit";
import "./ArtifactCheck.css";

class ArtifactCheck extends Component{
    state= {

    }

    render(){
        return(
            <div className="ArtifactModuleWrapper">
                <CodeValidation storeOptions = {this.props.storeOptions} coinCount = {this.props.coinCount} refresh = {this.props.refresh} refreshed = {this.props.refreshed} baseUrl = {this.props.codeValidBaseUrl}  
                    toValidateImgUrl = {this.props.toValidateImgUrl} activeTeam = {this.props.activeTeam}
                    trCoinsBackUpUrl = {this.props.baseUrl.dynamicBase4}  stateCoins = {this.props.stateCoins} updateCoinState = {this.props.updateCoinState}
                    bought = {this.props.bought} buyHandler = {this.props.buyHandler} validationLimit = {this.props.validationLimit}/>   {/* Controlling Factor */}
                    
                    
            </div>
        )
    }
}

export default ArtifactCheck;   
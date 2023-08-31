import React, { Component } from "react";
import CodeValidation from "../CodeValidation/CodeValidation";
import ActualChit from "../ActualChit/ActualChit";
import DummyChit from "../DummyChit/DummyChit";
import "./ArtifactCheck.css";

class ArtifactCheck extends Component{
    state= {

    }

    render(){
        return(
            <div className="ArtifactModuleWrapper">
                <CodeValidation coinCount = {this.props.coinCount} refresh = {this.props.refresh} refreshed = {this.props.refreshed} baseUrl = {this.props.codeValidBaseUrl}  
                    toValidateImgUrl = {this.props.toValidateImgUrl} activeTeam = {this.props.activeTeam}
                    bought = {this.props.bought} buyHandler = {this.props.buyHandler} validationLimit = {this.props.validationLimit}/>   {/* Controlling Factor */}
                    
                    <h4 className="ChitTypeHeading">Type - {this.props.chitType.toUpperCase()}</h4>
                    <div className="ChitContainer">
                        {this.props.bought?<ActualChit chitType = {this.props.chitType} activeTeam = {this.props.activeTeam} baseUrl = {this.props.baseUrl}/>:<DummyChit/>}
                    </div>
                    <div className="RefreshDiv">
                        Press This
                        <button onClick={this.props.onRefreshClick} className="RefreshCollection">
                            <ion-icon name="reload-circle-outline"></ion-icon>
                        </button>
                        To Refresh
                    </div>
            </div>
        )
    }
}

export default ArtifactCheck;   
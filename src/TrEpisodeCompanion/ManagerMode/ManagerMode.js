import React, { Component } from "react";
import axios from "axios";
import "./ManagerMode.css";
import AlertUpdate from "./AlertUpdate/AlertUpdate";
import CodeNull from "./CodeNull/CodeNull";
import AddUser from "./AddUser/AddUser";
import AddChit from "./AddChit/AddChit";

class ManagerMode extends Component{
    state = {
        updateArtifactsCode: false
    }
    render(){
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
        return(
            <div className="ManagerContainer">
                <h2 className="ManagerTitle">MR. Manager</h2>
                <AlertUpdate baseUrl = {this.props.baseUrl}/>
                <AddUser baseUrl = {this.props.baseUrl}/>
                <AddChit baseUrl = {this.props.baseUrl}/>

                <div className="DangerButt" onClick={updateArtifacts}><ion-icon name="warning-outline"></ion-icon></div>
                {this.state.updateArtifactsCode?<CodeNull baseUrl = {this.props.baseUrl} />:null}
            </div>
        );
    }
}

export default ManagerMode
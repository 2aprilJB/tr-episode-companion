import React, { Component } from "react";
import "./AlertModule.css";
import axios from "axios";

class AlertModule extends Component{
    state = {
        alertMsg: ""
    }

    componentDidMount(){
        axios.get('https://tr-episode-companion-default-rtdb.firebaseio.com/alertMsg.json')
                 .then(resp=>{
                    this.setState({
                        alertMsg: resp.data.msg
                    })
                 })
                 .catch(err=>{
                    alert('Network Issue');
                    console.log(err);
                 })
    }
    

    render(){
        let onRefresh =()=>{
            axios.get('https://tr-episode-companion-default-rtdb.firebaseio.com/alertMsg.json')
                 .then(resp=>{
                    this.setState({
                        alertMsg: resp.data.msg
                    })
                 })
                 .catch(err=>{
                    alert('Network Issue');
                    console.log(err);
                 })
        }
        return(
            <div className="AlertModuleContainer">
                <h3 className="AlertHead">Alerts</h3>
                <div className="AlertModule">{this.state.alertMsg}</div>
                <button onClick={onRefresh} className="AlertRefresh"><ion-icon name="reload-circle-outline"></ion-icon></button>
            </div>
        )
    }
}

export default AlertModule;
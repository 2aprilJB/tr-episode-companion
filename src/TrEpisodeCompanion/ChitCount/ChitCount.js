import React, { Component } from "react";
import "./ChitCount.css";
import axios from "axios";

class ChitCount extends Component{
    state = {
        chits: {},
        chitCount: [] 
    } 
    componentDidMount(){
        axios.get('https://tr-episode-companion-default-rtdb.firebaseio.com/chits.json')
             .then(res=>{
                let tempCount = [0,0];
                res.data['i'].map(ele=>{
                    if(ele[2]==='Z')
                        tempCount[0]++;
                    else{}
                })
                res.data['ii'].map(ele=>{
                    if(ele[2]==='Z')
                        tempCount[1]++;
                    else{}
                })
                this.setState({
                    chits:res.data,
                    chitCount: tempCount
                })
                
             })
             .catch(err=>{
                alert('Network Error');
                console.log(err);
             })
    }
    
    render(){
        let onRefresh = ()=>{
            axios.get('https://tr-episode-companion-default-rtdb.firebaseio.com/chits.json')
             .then(res=>{
                let tempCount = [0,0];
                res.data['i'].map(ele=>{
                    if(ele[2]==='Z')
                        tempCount[0]++;
                    else{}
                })
                res.data['ii'].map(ele=>{
                    if(ele[2]==='Z')
                        tempCount[1]++;
                    else{}
                })
                this.setState({
                    chits:res.data,
                    chitCount: tempCount
                })
                
             })
             .catch(err=>{
                alert('Network Error');
                console.log(err);
             })
        }

        return(
            <div className="ChitCount">
                <h2>Remaining Chits:-</h2>
                <h3>Type- I: {this.state.chitCount[0]}</h3>
                <h3>Type- II: {this.state.chitCount[1]}</h3>
                Tap to Refresh Chit Count
                <button onClick={onRefresh} className="RefreshChitCount"><ion-icon name="reload-circle-outline"></ion-icon></button>
            </div>
        )
    }
}

export default ChitCount;
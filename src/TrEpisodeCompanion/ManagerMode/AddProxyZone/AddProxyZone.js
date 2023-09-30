import React, { Component } from "react";
import "./AddProxyZone.css";
import EnterData from "../AddUser/EnterData/EnterData";
import axios from "axios";
import ShowProxyZones from "./ShowProxyZones/ShowProxyZones";

class AddProxyZone extends Component{
    state = {
        baseUrl : this.props.baseUrl + 'publicCoords/polygons/charProxies.json',
        currValue : {
            zoneCode:'ZRS',
            centerCoordsX:'',
            centerCoordsY:'',
            radius:'15',
            weight:'2',
            color:'cyan',
            boundColor:'blue'
        },
        updating: false
    }
    onChangeHandler = (e,currVal,currValueInd)=>{
        currVal = e.target.value;
        let prevVal = this.state.currValue;
        prevVal[currValueInd] = currVal
        this.setState({
            currValue: prevVal
        })
    }

    onSubmitHandler = ()=>{
        if(window.confirm("Are You sure to add This Zone with following props:- ??  " + this.state.currValue)){
            this.setState({
                updating:true   //TO disable submit button till the New Zone is updated
            })

            let values = this.state.currValue;
            let newProxyZone = [
                values.zoneCode,
                {
                    color: values.color,
                    boundColor: values.boundColor,
                    weight: parseFloat(values.weight), //Converting String to Number
                    radius: parseFloat(values.radius)  //Converting String to Number             
                },
                this.props.draggedCoords
            ]

            axios.get(this.state.baseUrl)
                .then(resp=>{
                    let tempProxyZones = resp.data;
                    tempProxyZones = [...tempProxyZones,newProxyZone];
                    axios.put(this.state.baseUrl,tempProxyZones)
                        .then(res=>{
                            this.setState({
                                updating: false //To enable submit button
                            })
                        })
                })
        }
        else{
            alert("Wise Choice!! Take a good review")
        }
    }
    render(){
        return(
            <div className="AddWrapper">
                
                <ShowProxyZones baseUrl = {this.state.baseUrl} />

                <EnterData onChangeHandler = {this.onChangeHandler} currValIn = {'zoneCode'} currValue = {this.state.currValue.zoneCode} enterWhat = "Zone-Code" />
                <EnterData onChangeHandler = {this.onChangeHandler} currValIn = {'radius'} currValue = {this.state.currValue.radius} enterWhat = "Radius" />
                <EnterData onChangeHandler = {this.onChangeHandler} currValIn = {'weight'} currValue = {this.state.currValue.weight} enterWhat = "Weight" />
                <EnterData onChangeHandler = {this.onChangeHandler} currValIn = {'color'} currValue = {this.state.currValue.color} enterWhat = "Fill-Color" />
                <EnterData onChangeHandler = {this.onChangeHandler} currValIn = {'boundColor'} currValue = {this.state.currValue.boundColor} enterWhat = "Boundary-Color" />
                {!this.state.updating?<button className="SubmitUser" onClick={this.onSubmitHandler}><ion-icon name="caret-forward-outline"></ion-icon></button>:null}
            </div>
        );
    }
}

export default AddProxyZone;
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
    updateProxyZoneToServer = (newProxyZone)=>{
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
                        .catch(err=>{
                            console.log(err);
                            alert("There's another Network error, Its gonna be a nightmare");
                        })
                })
    }

    //Button Handlers
    onSubmitHandler = ()=>{
        if(window.confirm("Are You sure to add This Zone with following props:- ??  " + this.state.currValue)){
            this.setState({
                updating:true   //TO disable submit button till the New Zone is updated
            })

            let values = this.state.currValue;
            //This below line is when manual input of coords can happen i.e when LS is querried
            let coords = this.props.forAll?[parseFloat(values.centerCoordsX),parseFloat(values.centerCoordsY)]:this.props.draggedCoords;
            console.log(this.props.draggedCoords);
            let nProxyZone = [
                values.zoneCode,
                {
                    color: values.color,
                    boundColor: values.boundColor,
                    weight: parseFloat(values.weight), //Converting String to Number
                    radius: parseFloat(values.radius)  //Converting String to Number             
                },
                coords
            ]
            this.updateProxyZoneToServer(nProxyZone);
        }
        else{
            alert("Wise Choice!! Take a good review")
        }
    }
    onSpecificHandler = (zCode,colorFill)=>{
        if(window.confirm("Are you sure to add Danger zone?")){
            let values = this.state.currValue;
            let coords = this.props.forAll?[parseFloat(values.centerCoordsX),parseFloat(values.centerCoordsY)]:this.props.draggedCoords;
            let nProxyZone = [
                zCode,
                {
                    color: colorFill,
                    boundColor: colorFill,
                    weight: "3",
                    radius: parseFloat(values.radius)
                },
                coords
            ]
            this.updateProxyZoneToServer(nProxyZone);
        }
        else{
            alert("Wise Choice!! Now Run CEO sahab Runnn,or Manager sahab jinki bhi kursi ho");
        }
    }

    render(){
        return(
            <div className="AddWrapper">
                
                <ShowProxyZones baseUrl = {this.state.baseUrl} />

                <EnterData onChangeHandler = {this.onChangeHandler} currValIn = {'zoneCode'} currValue = {this.state.currValue.zoneCode} enterWhat = "Zone-Code" />
                {this.props.forAll?<EnterData onChangeHandler = {this.onChangeHandler} currValIn = {'centerCoordsX'} currValue = {this.state.currValue.centerCoordsX} enterWhat = "Center-X" />:null}
                {this.props.forAll?<EnterData onChangeHandler = {this.onChangeHandler} currValIn = {'centerCoordsY'} currValue = {this.state.currValue.centerCoordsY} enterWhat = "Center-Y" />:null}
                <div style={{display:"flex",flexDirection:"row"}}>
                    <EnterData onChangeHandler = {this.onChangeHandler} currValIn = {'radius'} currValue = {this.state.currValue.radius} enterWhat = "Radius" />
                    <EnterData onChangeHandler = {this.onChangeHandler} currValIn = {'weight'} currValue = {this.state.currValue.weight} enterWhat = "Weight" />
                </div>

                <div style={{display:"flex",flexDirection:"row"}}>
                    <EnterData onChangeHandler = {this.onChangeHandler} currValIn = {'color'} currValue = {this.state.currValue.color} enterWhat = "Fill-Color" />
                    <EnterData onChangeHandler = {this.onChangeHandler} currValIn = {'boundColor'} currValue = {this.state.currValue.boundColor} enterWhat = "Boundary-Color" />
                </div>
                
                <div style={{display:"flex",justifyContent:"space-evenly",width:"100%"}}>
                    {!this.state.updating?<button style={{color:"green"}} className="SubmitUser" onClick={()=>this.onSpecificHandler('Safe','green')}><ion-icon name="compass-outline"></ion-icon></button>:null}
                    {!this.state.updating?<button className="SubmitUser" onClick={this.onSubmitHandler}><ion-icon name="caret-forward-outline"></ion-icon></button>:null}
                    {!this.state.updating?<button style={{color:"red"}} className="SubmitUser" onClick={()=>this.onSpecificHandler('Danger','red')}><ion-icon name="skull-outline"></ion-icon></button>:null}
                </div>
                
            </div>
        );
    }
}

export default AddProxyZone;
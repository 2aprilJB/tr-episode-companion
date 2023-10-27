import React, { Component } from "react";
import { MapContainer as LeafletMap, TileLayer, Polygon, Circle, Marker, Popup, ImageOverlay } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import "./TheMap.css";
import {  iconPerson, iconChar  } from './Icon/Icon';
import Lintt from "../../Assets/Lintt/Lintt";
import Loader from "../../Assets/Loader/Loader";
import axios from "axios";
import PublicDynamic from "./PublicDynamic/PublicDynamic";
import PrivateDynamic from "./PrivateDynamic/PrivateDynamic";
import { sendCoordsSignal, updateActiveTeamCoords, updateSpecialZones } from "../../FireStoreUtils/FireStoreUtils";
import { isMarkerInsidePolygon } from "./DynamicMarker/DynamicMarker";
import Modal from "../../Containers/Modal/Modal";
class TheMap extends Component{

    state = {
        coords: null,
        baseUrlPublicCoords: this.props.baseUrls.staticBase + 'publicCoords',
        activeProxy:'',
        showModal: false,
        gettingCoords: false,
        allCoords: {}
    }

    componentDidMount(){
        axios.get(this.state.baseUrlPublicCoords + '.json')
             .then(resp=>{
                this.setState({
                    coords: resp.data,
                    loaded:true
                })
             })
             .catch(err=>{
                console.log(err);
                alert('Network issue has been observed')
             })
        
    }
    onBackDrop = ()=>{
        this.setState({
            showModal: false,
            activeProxy: ''
        })
    }

    getCoords = ()=>{
        sendCoordsSignal(); //Sending signal to FireStore upon which we will recieve snapshot
        this.setState({
            gettingCoords: false
        })
        setTimeout(()=>{
            axios.get(this.props.baseUrls.dynamicBase5 + '.json')
                 .then(resp=>{
                    this.setState({
                        allCoords : resp.data.participantsCoords
                    })
                 })
                 .catch(err=>{
                    console.log(err)
                    alert("There's a Network Error");
                 })
        },5000) //Assuming By 5 seconds All Participant's devices would've sent their location.
    }   


    render(){
        return(
            this.props.activeTeamCoords?<div className="TheMapContainer">
                <Modal show = {this.state.showModal} onBackDrop = {this.onBackDrop}>{this.state.activeProxy==='Z3'?<div>Brij</div>:this.state.activeProxy==='Z2'?<div>siba</div>:null}</Modal>
                <LeafletMap center={this.props.activeTeamCoords} zoom={15}>
                    <TileLayer
                    maxZoom={21}
                    url='https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' 
                    />
                    <PublicDynamic secondaryProxy = {this.props.secondaryProxy} baseUrls = {this.props.baseUrls} activeProxyZoneHandler = {this.props.activeProxyZoneHandler} activeProxyZone ={this.props.activeProxyZone} publicCoords = {this.props.publicCoords} draggedCoords = {this.props.draggedCoords} setDraggedCoords = {this.props.setDraggedCoords} setPublicCoordsForProxies ={this.props.setPublicCoordsForProxies} baseUrls = {this.props.baseUrls} activeProxy = {this.state.activeProxy} modalBackDrop = {this.onBackDrop} charProximityHandler = {this.isMarkerInsideProximmity} baseUrlPublicCoords = {this.state.baseUrlPublicCoords} activeTeamCoords = {this.props.activeTeamCoords} activeTeam = {this.props.activeTeam}/>
                    {this.state.allCoords?<PrivateDynamic allCoords = {this.state.allCoords} />:null}
                    <ImageOverlay url = 'https://i.ibb.co/XjXxGkR/sector-16.png' bounds={[[23.232012525273973,72.64771431684495],[23.230016085247495,72.64565974473955]]}></ImageOverlay>
                </LeafletMap>
                {this.props.activeTeam.length===2?this.state.gettingCoords===false?<button onClick={this.getCoords} className="GetCoords">GetCoords</button>:null:null}
            </div>:<Loader loaded = {false}/>
        );
    }
}

export default TheMap;






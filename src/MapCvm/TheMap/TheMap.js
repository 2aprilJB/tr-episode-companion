import React, { Component } from "react";
import { MapContainer as LeafletMap, TileLayer, Polygon, Circle, Marker, Popup, ImageOverlay } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import "./TheMap.css";
import {  iconPerson, iconChar  } from './Icon/Icon';
import Lintt from "../../Assets/Lintt/Lintt";
import axios from "axios";
import PublicDynamic from "./PublicDynamic/PublicDynamic";
import { updateActiveTeamCoords, updateSpecialZones } from "../../FireStoreUtils/FireStoreUtils";
import { isMarkerInsidePolygon } from "./DynamicMarker/DynamicMarker";
import Modal from "../../Containers/Modal/Modal";
class TheMap extends Component{

    state = {
        coords: null,
        baseUrlPublicCoords: this.props.baseUrls.staticBase + 'publicCoords',
        activeProxy:'',
        showModal: false
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
    isMarkerInsideProximmity = (charProxyPoly,charCode)=>{
        if(isMarkerInsidePolygon(this.props.activeTeamCoords, charProxyPoly)){
            
            if(!this.state.showModal){
                this.setState({
                    showModal:true,
                    activeProxy: charCode
                })
            }
            else{}
        }
        else{
            // if(this.state.showModal){{
            // }}
            // else{}
            this.onBackDrop();
        }
    }
    onBackDrop = ()=>{
        this.setState({
            showModal: false,
            activeProxy: ''
        })
        console.log(this.state)
    }
    render(){
        
        // setTimeout(()=>axios.put(this.props.baseUrl + '/coords.json',this.state.coords)
        // .catch(err=>{
        //    console.log(err);
        //    alert('Error has occcurred that too in connection with MAp')
        // }),3000)
        return(
            this.state.coords?<div className="TheMapContainer">
                <Modal show = {this.state.showModal} onBackDrop = {this.onBackDrop}>{this.state.activeProxy==='Z3'?<div>Brij</div>:this.state.activeProxy==='Z2'?<div>siba</div>:null}</Modal>
                <LeafletMap center={this.state.coords.mapCenter} zoom={15}>
                    <TileLayer
                    maxZoom={21}
                    url='https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' 
                    />

                    <PublicDynamic baseUrls = {this.props.baseUrls} activeProxy = {this.state.activeProxy} modalBackDrop = {this.onBackDrop} charProximityHandler = {this.isMarkerInsideProximmity} baseUrlPublicCoords = {this.state.baseUrlPublicCoords} activeTeamCoords = {this.props.activeTeamCoords} activeTeam = {this.props.activeTeam}/>
                    
                    <ImageOverlay url = 'https://i.ibb.co/XjXxGkR/sector-16.png' bounds={[[23.232012525273973,72.64771431684495],[23.230016085247495,72.64565974473955]]}></ImageOverlay>
                </LeafletMap>
            </div>:<h2>LOADING...</h2>
        );
    }
}

export default TheMap;






import React, { Component } from "react";
import { MapContainer as LeafletMap, TileLayer, Polygon, Circle, Marker, Popup, ImageOverlay } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import "./TheMap.css";
import {  iconPerson, iconChar  } from './Icon/Icon';
import Lintt from "../../Assets/Lintt/Lintt";
import axios from "axios";
import PublicDynamic from "./PublicDynamic/PublicDynamic";
import { updateActiveTeamCoords, updateSpecialZones } from "../../FireStoreUtils/FireStoreUtils";
class TheMap extends Component{

    state = {
        coords: null,
        activeTeamCoords: ['',''],
        baseUrlPublicCoords: this.props.baseUrl + '/coords/publicCoords'
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
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
        if (navigator.geolocation) {
            if(typeof navigator.geolocation.watchPosition !== 'function'){
                navigator.geolocation.getCurrentPosition(position=>{
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    this.setState({
                        activeTeamCoords:[latitude,longitude]
                    })
                },err=>{
                    
                    if(err.code===2)
                        console.log("Unable to retrieve your location");
                    else if(err.code===3)
                        console.log('Shits happening');
                },options)
            }
            else{
                navigator.geolocation.watchPosition(position=>{
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    
                    // let zonePolyCoords = [[23.31704,72.16704] , [22.73661,72.47311] , [22.62099,73.10878] , [22.99475,74.32242]];
                    // zonePolyCoords.map((ele,ind)=>{
                    //     updateSpecialZones("specialZone1",ele,ind);
                    // })
                    // updateSpecialZones(['sada','asdasd'],0);

                    updateActiveTeamCoords(this.props.activeTeam,[latitude,longitude],this.props.charCodesArr);
                    this.setState({
                        activeTeamCoords: [latitude,longitude]
                    })
    
                },err=>{
                    
                    if(err.code===2)
                        console.log("Unable to retrieve your location");
                    else if(err.code===3)
                        console.log('Shits happening');
                },options);   
            }
        }

        else {
            alert('Not supported in your goddamn browser')
        }
    }

    render(){
        // setTimeout(()=>axios.put(this.props.baseUrl + '/coords.json',this.state.coords)
        // .catch(err=>{
        //    console.log(err);
        //    alert('Error has occcurred that too in connection with MAp')
        // }),3000)
        return(
            this.state.coords?<div className="TheMapContainer">
                <LeafletMap center={this.state.coords.mapCenter} zoom={15}>
                    <TileLayer
                    maxZoom={21}
                    url='https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' 
                    />

                    <PublicDynamic baseUrlPublicCoords = {this.state.baseUrlPublicCoords} activeTeamCoords = {this.state.activeTeamCoords} activeTeam = {this.props.activeTeam}/>
                    
                    <ImageOverlay url = 'https://i.ibb.co/XjXxGkR/sector-16.png' bounds={[[23.232012525273973,72.64771431684495],[23.230016085247495,72.64565974473955]]}></ImageOverlay>
                </LeafletMap>
            </div>:<h2>LOADING...</h2>
        );
    }
}

export default TheMap;






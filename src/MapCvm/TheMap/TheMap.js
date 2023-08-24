import React, { Component } from "react";
import { MapContainer as LeafletMap, TileLayer, Polygon, Circle, Marker, Popup, ImageOverlay } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import "./TheMap.css";
import {  iconPerson, iconChar  } from './Icon/Icon';
import Lintt from "../../Assets/Lintt/Lintt";
import axios from "axios";
class TheMap extends Component{

    state = {
        coords: null
    }

    componentDidMount(){
        axios.get(this.props.baseUrl + '/coords/publicCoords.json')
             .then(resp=>{
                this.setState({
                    coords: resp.data
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
            navigator.geolocation.watchPosition(position=>{
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                this.setState({
                    coords: [latitude,longitude]
                })
                
            },err=>{
                
                if(err.code===2)
                    console.log("Unable to retrieve your location");
                else if(err.code===3)
                    console.log('Shits happening');
            },options);
          }

        else {
            console.log("Geolocation not supported");
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
                    url='http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' 
                    />
                    
                    {this.state.coords.markers.charMarkers.map((ele,ind)=>{
                        return(
                            <Marker eventHandlers={{
                                click: (e)=>{console.log(ele[0])}
                            }} key={ele[0]} position={ele[3]} icon={iconChar}>
                                
                            </Marker>
                        )
                    })}
                    <ImageOverlay url = 'https://i.ibb.co/XjXxGkR/sector-16.png' bounds={[[23.232012525273973,72.64771431684495],[23.230016085247495,72.64565974473955]]}></ImageOverlay>
                </LeafletMap>
            </div>:<h2>LOADING...</h2>
        );
    }
}

export default TheMap;



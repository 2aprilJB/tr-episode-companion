import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('../../../Assets/Images/marker.png'),
    iconRetinaUrl: require('../../../Assets/Images/marker.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    border: 0,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-div-icon'
});

export { iconPerson };
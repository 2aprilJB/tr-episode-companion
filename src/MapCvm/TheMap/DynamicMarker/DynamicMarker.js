import getDistance from "geolib/es/getPreciseDistance";

export const isMarkerInsidePolygon=(marker,poly)=>{
    var x = marker[0],
        y = marker[1];

    var inside = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        var xi = poly[i][0],
            yi = poly[i][1];
        var xj = poly[j][0],
            yj = poly[j][1];
        var intersect =
            yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
}

export const isMarkerInsideCircle = (marker,center,radius)=>{
    let dist = getDistance(
        { latitude: marker[0], longitude: marker[1] },
        { latitude: center[0], longitude: center[1] }
    );
    if(dist<radius){
        return true
    }
    else{}
}
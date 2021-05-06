import L from "leaflet";
import redMarker from '../../assets/mapMarker/marker-icon-red.png';
import blueMarker from '../../assets/mapMarker/marker-icon-blue.png';
import markerShadow from '../../assets/mapMarker/marker-shadow.png';

export function RedMarker() {
    return L.icon({
        iconUrl: redMarker,
        iconRetinaUrl: redMarker,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });
}

export function BlueMarker() {
    return L.icon({
        iconUrl: blueMarker,
        iconRetinaUrl: blueMarker,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}


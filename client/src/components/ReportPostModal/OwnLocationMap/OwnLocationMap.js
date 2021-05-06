import { IonButton, IonIcon } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet';
import { AlertContext } from '../../../context/AlertContext';
import 'leaflet/dist/leaflet.css';

import LocationService from '../../../hooks/useGeolocationService';
import { RedMarker } from '../../MapMarker/MapMarker';


const OwnLocationMap = ({ userLocation, setUserLocation }) => {
    const [map, setMap] = useState(null);
    const { setAlertMessage } = useContext(AlertContext);
    const markerRef = useRef();


    const handleOnFlyTo = async () => {
        let coordinates = await LocationService.getCurrentLocation();

        // For Error Toast Messages
        if (typeof coordinates === 'string') {
            setAlertMessage(coordinates)
        } else {
            setUserLocation([coordinates.coords.latitude, coordinates.coords.longitude]);
            map.flyTo([coordinates.coords.latitude, coordinates.coords.longitude]);
        }
    }

    // Event when Marker is dragged
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const newPosition = [marker.getLatLng().lat, marker.getLatLng().lng]
                    console.log(newPosition);
                    setUserLocation(newPosition)
                }
            },
        }),
        [],
    )

    return (
        <>
            <MapContainer center={userLocation} zoom={13} scrollWheelZoom={false} style={{ height: '50%', width: "auto", }} whenCreated={setMap}>
                <TileLayer
                    detectRetina={true}
                    attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' + ' Intern'}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker ref={markerRef} position={userLocation} icon={RedMarker()} draggable={true} eventHandlers={eventHandlers}  >
                    <Popup>Dein Standort</Popup>
                </Marker>
            </MapContainer>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <IonButton onClick={handleOnFlyTo}><IonIcon icon={locationOutline} /></IonButton>
            </div>
        </>
    )
}

export default OwnLocationMap;

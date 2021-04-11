import { IonButton, IonToast } from '@ionic/react';
import { useFilesystem } from '@ionic/react-hooks/filesystem';
import React, { useContext, useRef, useState } from 'react';
// import { useIonViewDidEnter } from '@ionic/react';
import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet';
import { AlertContext } from '../../../context/AlertContext';

import LocationService from '../../../hooks/useGeolocationService';


const OwnLocationMap = ({ location, setLocation }) => {
    const [map, setMap] = useState(null);

    const { setAlertMessage } = useContext(AlertContext);


    const handleOnFlyTo = async () => {
        let coordinates = await LocationService.getCurrentLocation();

        // For Error Toast Messages
        if (typeof coordinates === 'string') {
            setAlertMessage(coordinates)
        } else {
            setLocation([coordinates.coords.latitude, coordinates.coords.longitude]);
            map.flyTo([coordinates.coords.latitude, coordinates.coords.longitude]);
        }
    }

    return (
        <>
            <MapContainer center={location} zoom={13} scrollWheelZoom={false} style={{ height: '50%', width: "100%" }} whenCreated={setMap}>
                <TileLayer
                    detectRetina={true}
                    attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' + ' Intern'}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={location} color={"red"} >
                    <Popup>You are here!</Popup>
                </Marker>
                {/* <LocationMarker /> */}
            </MapContainer>
            <IonButton onClick={handleOnFlyTo}>To your position</IonButton>
        </>
    )
}

export default OwnLocationMap;

import React, { useContext, useState } from 'react';
import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet';
// import Marker from 'react-leaflet-enhanced-marker';
import { RedMarker, BlueMarker } from '../MapMarker/MapMarker';


import { IonText, IonButton, IonItem, IonLabel, useIonViewDidEnter } from '@ionic/react';
import CardLegend from './CardLegend/CardLegend';
import LocationService from '../../hooks/useGeolocationService';
import { AlertContext } from '../../context/AlertContext';
import { LocationsContext } from '../../context/LocationsContext';
import OtherLocationsModal from './OtherLocationsModal/OtherLocationsModal';
import './styles.css';


const GeolocationView = () => {
    const [map, setMap] = useState(null);
    const [isLegendOpen, setIsLegendOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [locationId, setLocationId] = useState();
    const { userLocation, setUserLocation, locations } = useContext(LocationsContext);
    const { setAlertMessage } = useContext(AlertContext);

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

    /* 
      * trigger a 'window-resize' event when Page has finished, 
      * rendering and animating, so leaflet map can read a 
      * consistent height value
      */
    useIonViewDidEnter(() => {
        window.dispatchEvent(new Event('resize'));
    });
    return (
        <>
            <MapContainer center={userLocation} zoom={13} style={{ height: "100%", width: "100%" }} whenCreated={setMap}>
                <TileLayer
                    detectRetina={true}
                    attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' + ' Intern'}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {locations.map((location, i) => {
                    return (
                        <Marker key={i} position={location.coordinates} icon={BlueMarker()} >
                            <Popup>
                                From other users
                                <div onClick={() => {
                                    setIsModalOpen(true);
                                    setLocationId(location._id);
                                }}
                                    style={{ color: "#0044CC", cursor: "pointer" }}
                                >
                                    mehr...
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                <Marker position={userLocation} icon={RedMarker()} zIndexOffset={100} >
                    <Popup>
                        Current position
                    </Popup>
                </Marker>
            </MapContainer>

            <IonItem className='geoAbs'>
                <IonLabel>
                    <IonText>lat={userLocation[0]}</IonText>
                    <IonText> lng={userLocation[1]}</IonText>
                </IonLabel>
            </IonItem>
            <IonButton onClick={handleOnFlyTo} className='geoFooter'>Get Current Location</IonButton>
            <CardLegend isLegendOpen={isLegendOpen} setIsLegendOpen={setIsLegendOpen} />
            { locationId != undefined && <OtherLocationsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} locationId={locationId} setLocationId={setLocationId} />}
        </>
    )
}
export default GeolocationView;
import React, { useContext, useEffect, useState } from 'react';
// import GoogleMapReact from 'google-map-react'; löschen der Abhängigkeit
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {
    IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonText, IonButton, IonItem, IonLabel, IonSpinner, useIonViewDidEnter, IonLoading, IonIcon
} from '@ionic/react';
import './styles.css';
import CardLegend from './CardLegend/CardLegend';
import LocationService from '../hooks/useGeolocationService';
import { AlertContext } from '../context/AlertContext';
import { LocationsContext } from '../context/LocationsContext';


const HomeView = () => {
    const [map, setMap] = useState(null);
    const [isLegendOpen, setIsLegendOpen] = useState(false)
    const { userLocation, setUserLocation } = useContext(LocationsContext)
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
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle slot="start">Map GeolocationTab</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {console.log(userLocation)}
                <>
                    <MapContainer center={userLocation} zoom={13} style={{ height: "100%", width: "100%" }} whenCreated={setMap}>
                        <TileLayer
                            detectRetina={true}
                            attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' + ' Intern'}
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={userLocation}>
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
                </>

            </IonContent>
        </IonPage >
    )
}
export default HomeView
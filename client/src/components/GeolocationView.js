import React, { useEffect } from 'react';
// import GoogleMapReact from 'google-map-react'; löschen der Abhängigkeit
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {
    IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonText, IonButton, IonItem, IonLabel, IonSpinner, useIonViewDidEnter, IonLoading
} from '@ionic/react';
import './styles.css';


// const position = [51.505, -0.09];

const HomeView = (props) => {
    const { latitude, longitude, getGeoLocation, loading } = props

    let position = [latitude, longitude];

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
                    <IonTitle slot="start">Map Geolocation</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {console.log(position)}
                {console.log(loading)}
                {loading ?
                    <IonLoading
                    isOpen={true}
                    message={'Bitte Warten...'}
                  />
                    :
                    <>
                        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100" }}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    Current position
                        </Popup>
                            </Marker>
                        </MapContainer>

                        <IonItem className='geoAbs'>
                            <IonLabel>
                                <IonText>lat={latitude}</IonText>
                                <IonText> lng={longitude}</IonText>
                            </IonLabel>
                        </IonItem>
                        <IonButton onClick={getGeoLocation} className='geoFooter'>Get Current Location</IonButton>
                    </>
                }
            </IonContent>
        </IonPage >
    )
}
export default HomeView
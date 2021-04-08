import React, { useEffect, useState } from 'react';
// import GoogleMapReact from 'google-map-react'; löschen der Abhängigkeit
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {
    IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonText, IonButton, IonItem, IonLabel, IonSpinner, useIonViewDidEnter, IonLoading, IonIcon
} from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import './styles.css';
import CardLegend from './CardLegend/CardLegend';


const HomeView = (props) => {
    const { latitude, longitude, getGeoLocation, loading } = props
    const [isLegendOpen, setIsLegendOpen] = useState(false)

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
                    <IonTitle slot="start">Map GeolocationTab</IonTitle>
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
                        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                detectRetina={true}
                                attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' + ' Intern'}
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup style={{ backgroundColor: "red" }}>
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
                        <CardLegend isLegendOpen={isLegendOpen} setIsLegendOpen={setIsLegendOpen} />
                    </>
                }
            </IonContent>
        </IonPage >
    )
}
export default HomeView
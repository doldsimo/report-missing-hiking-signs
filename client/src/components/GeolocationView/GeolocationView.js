import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { RedMarker, BlueMarker } from '../MapMarker/MapMarker';


import { useIonViewDidEnter, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import CardLegend from './CardLegend/CardLegend';
import LocationService from '../../hooks/useGeolocationService';
import { AlertContext } from '../../context/AlertContext';
import { LocationsContext } from '../../context/LocationsContext';
import OtherLocationsModal from './OtherLocationsModal/OtherLocationsModal';
import './styles.css';
import { locationOutline } from 'ionicons/icons';

const GeolocationView = () => {
    const [map, setMap] = useState(null);
    const [isLegendOpen, setIsLegendOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [locationId, setLocationId] = useState();
    const { userLocation, setUserLocation, locations } = useContext(LocationsContext);
    const { setAlertMessage } = useContext(AlertContext);

    const handleOnFlyTo = async () => {
        let coordinatesData = await LocationService.getCurrentLocation();

        let coordinates = [coordinatesData.coords.latitude, coordinatesData.coords.longitude];

        // For error toast messages
        if (typeof coordinatesData === 'string') {
            setAlertMessage(coordinatesData)
        } else {
            setUserLocation(coordinates);
            map.flyTo(coordinates);
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
                        <Marker
                            key={i}
                            position={location.coordinates}
                            icon={BlueMarker()}
                            eventHandlers={{
                                click: () => {
                                    setIsModalOpen(true);
                                    setLocationId(location._id);
                                },
                            }}>
                        </Marker>
                    );
                })}

                <Marker position={userLocation} icon={RedMarker()} zIndexOffset={100} >
                    <Popup>
                        Dein Standort
                    </Popup>
                </Marker>
            </MapContainer>

            <IonFab vertical="bottom" horizontal="center" slot="fixed">
                <IonFabButton onClick={handleOnFlyTo} style={{ opacity: 0.7 }}>
                    <IonIcon icon={locationOutline} />
                </IonFabButton>
            </IonFab>
            <CardLegend isLegendOpen={isLegendOpen} setIsLegendOpen={setIsLegendOpen} />
            { locationId != undefined && <OtherLocationsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} locationId={locationId} setLocationId={setLocationId} />}
        </>
    )
}
export default GeolocationView;
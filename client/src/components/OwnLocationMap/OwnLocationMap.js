import { useFilesystem } from '@ionic/react-hooks/filesystem';
import React, { useEffect } from 'react';
// import { useIonViewDidEnter } from '@ionic/react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const OwnLocationMap = () => {
    return (
        <MapContainer center={[48.051776, 8.206841]} zoom={13} scrollWheelZoom={false} style={{ height: '50%', width: "100%" }}>
            <TileLayer
                detectRetina={true}
                attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' + ' Intern'}
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[48.051776, 8.206841]}>
                <Popup style={{ backgroundColor: "red" }}>
                    Current position
                                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default OwnLocationMap;

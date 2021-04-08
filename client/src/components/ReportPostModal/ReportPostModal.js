import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonModal, IonRow, IonTextarea, IonThumbnail, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import OwnLocationMap from './OwnLocationMap/OwnLocationMap';
import { createReportPosts } from '../../api';

const ReportPostModal = ({ isReportModalOpen, setIsReportModalOpen, photo, takePhoto }) => {
    const [description, setdescription] = useState("");
    const [location, setLocation] = useState([48.051776, 8.206841]);

    const handleSubmit = () => {
        console.log("Submit");

        createReportPosts({ description: description, img: photo.webviewPath, coordinates: location });
    }


    return (
        <IonModal isOpen={isReportModalOpen} onDidDismiss={() => { setIsReportModalOpen(false) }} onDidPresent={() => window.dispatchEvent(new Event('resize'))}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Foto und Standort auswählen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="ion-padding">
                    <p>Melde ein fehlendes Wanderbild</p>
                    <div style={{ maxWidth: "500px", margin: "auto" }}>
                        <IonImg style={{ width: "100%", heigh: "auto" }} src={photo.webviewPath} />
                    </div>
                    <IonButton onClick={() => takePhoto(setIsReportModalOpen)}>Neues Photo</IonButton>
                    <IonItem>
                        <IonLabel position="floating">Beschreibungs description</IonLabel>
                        <IonTextarea value={description} onIonChange={e => setdescription(e.detail.value)}></IonTextarea>
                    </IonItem>

                    <div style={{ maxWidth: "500px", margin: "auto" }}>
                        <p>Wähle deinen Standort</p>
                    </div>
                </div>
                <OwnLocationMap location={location} setLocation={setLocation} />
                <IonButton onClick={handleSubmit}>Send to DB</IonButton>
            </IonContent>
            <IonButton onClick={() => setIsReportModalOpen(false)}>Close Modal</IonButton>
        </IonModal >
    )
}

export default ReportPostModal;

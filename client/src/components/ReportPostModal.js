import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonModal, IonRow, IonTextarea, IonThumbnail, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import OwnLocationMap from './OwnLocationMap/OwnLocationMap';

const ReportPostModal = ({ isReportModalOpen, setIsReportModalOpen, photo, takePhoto }) => {
    const [text, setText] = useState("");
    // let position = [48.051776, 8.206841];


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
                        <IonLabel position="floating">Beschreibungs Text</IonLabel>
                        <IonTextarea value={text} onIonChange={e => setText(e.detail.value)}></IonTextarea>
                    </IonItem>

                    <div style={{ maxWidth: "500px", margin: "auto" }}>
                        <p>Wähle deinen Standort</p>
                    </div>
                </div>
                <OwnLocationMap />
                <IonButton onClick={() => console.log("sendToDB")}>Send to DB</IonButton>
            </IonContent>
            <IonButton onClick={() => setIsReportModalOpen(false)}>Close Modal</IonButton>
        </IonModal >
    )
}

export default ReportPostModal;

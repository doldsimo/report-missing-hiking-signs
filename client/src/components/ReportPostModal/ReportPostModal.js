import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonLoading, IonModal, IonRow, IonTextarea, IonThumbnail, IonTitle, IonToast, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import OwnLocationMap from './OwnLocationMap/OwnLocationMap';
import * as api from '../../api/index';

const ReportPostModal = ({ isReportModalOpen, setIsReportModalOpen, photo, takePhoto }) => {
    const [description, setdescription] = useState("");
    const [location, setLocation] = useState([48.051776, 8.206841]);
    const [isloading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.createReportPosts({ description: description, img: photo.dataUrl, coordinates: location });
            console.log(data);
            setIsLoading(false);
            // setIsReportModalOpen(false);
        } catch (error) {
            console.log(error);
            setToastMessage("Etwas ist schief gelaufen");
            setIsLoading(false);
        }
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
                        <IonImg style={{ width: "100%", heigh: "auto" }} src={photo.dataUrl} />
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
                <IonLoading
                    isOpen={isloading}
                    onDidDismiss={() => setIsLoading(false)}
                    message={'Bitte warten...'}
                />
                <IonToast
                    isOpen={toastMessage != ""}
                    duration={1000}
                    onDidDismiss={() => setToastMessage("")}
                    message={toastMessage}
                    position="bottom"
                />
            </IonContent>
            <IonButton onClick={() => setIsReportModalOpen(false)}>Close Modal</IonButton>
        </IonModal >
    )
}

export default ReportPostModal;

import React from 'react';
import { IonButton, IonCol, IonGrid, IonImg, IonModal, IonRow } from '@ionic/react';

const ReportPostModal = ({ isReportModalOpen, setIsReportModalOpen, photo, takePhoto }) => {
    return (
        <IonModal isOpen={isReportModalOpen}>
            <div>
                <p>This is modal content</p>
                <IonImg src={photo.webviewPath} />
                <IonButton onClick={() => takePhoto(setIsReportModalOpen)}>Neues Photo</IonButton>

                <IonButton onClick={() => console.log("sendToDB")}>Send to DB</IonButton>
            </div>
            <IonButton onClick={() => setIsReportModalOpen(false)}>Close Modal</IonButton>
        </IonModal >
    )
}

export default ReportPostModal;

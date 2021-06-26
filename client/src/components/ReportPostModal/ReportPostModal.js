import React, { useContext, useEffect, useRef, useState } from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonModal, IonText, IonTextarea, IonTitle, IonToolbar, isPlatform } from '@ionic/react';
import OwnLocationMap from './OwnLocationMap/OwnLocationMap';
import * as api from '../../api/index';
import { AlertContext } from '../../context/AlertContext';
import { LocationsContext } from '../../context/LocationsContext';
import { cameraOutline, imageOutline, scanOutline, syncOutline } from 'ionicons/icons';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';

const ReportPostModal = ({ isReportModalOpen, setIsReportModalOpen, photo, setPhotos, takePhoto }) => {
    const { startCameraPreview, stopCameraPreview } = usePhotoGallery();
    const cropperRef = useRef(null);
    const [description, setdescription] = useState("");
    const [isCropped, setIsCropped] = useState(false)

    const { userLocation, setUserLocation } = useContext(LocationsContext)
    const { setAlertMessage, setIsLoading } = useContext(AlertContext);
    const { locations, setLocations } = useContext(LocationsContext);


    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.createReportPosts({ description: description, img: photo.dataUrl, coordinates: userLocation });
            console.log(data);
            setLocations([...locations, data]);
            setIsLoading(false);
            setIsReportModalOpen(false);
        } catch (error) {
            console.log(error);
            setAlertMessage("Etwas ist schief gelaufen");
            setIsLoading(false);
        }
        setUserLocation([48.051776, 8.206841]);
    }

    const rotateImage = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.rotate(90);
    }

    const handleCropImage = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        const imageUrl = cropper.getCroppedCanvas().toDataURL();
        setPhotos({ dataUrl: imageUrl })
        setIsCropped(true);
    }


    return (
        <IonModal isOpen={isReportModalOpen} onDidDismiss={() => { setIsReportModalOpen(false); setIsCropped(false); setPhotos({}); startCameraPreview() }} onDidPresent={() => { window.dispatchEvent(new Event('resize')); stopCameraPreview(); }} >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Foto und Standort</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsReportModalOpen(false)}>
                            Schließen
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {console.log("Foto:", photo.dataUrl)}
            <IonContent>
                <div className="ion-padding">

                    <div style={{ maxWidth: "550px", maxHeight: "450px", margin: "auto" }}>
                        {
                            isCropped ?
                                <img style={{ heigh: "100%", width: "auto", maxHeight: "450px", display: "block", margin: "auto" }} src={photo.dataUrl} />
                                :
                                <Cropper
                                    ref={cropperRef}
                                    src={photo.dataUrl}
                                    style={isPlatform("hybrid") ? { height: "65vh", maxHeight: "550px", width: "auto" } : { heigh: "100%", width: "auto", maxHeight: "450px" }}
                                    // Cropper.js options
                                    initialAspectRatio={16 / 9}
                                    guides={false}
                                    ref={cropperRef}
                                />
                        }
                    </div>
                    {!isCropped &&
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <IonButton onClick={() => rotateImage()} color="medium"><IonIcon icon={syncOutline} /></IonButton>
                                <IonButton onClick={() => handleCropImage()}><IonText></IonText> <IonIcon icon={scanOutline} /></IonButton>
                            </div>
                        </div>
                    }
                    <IonText>Neues Bild:</IonText>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            {isPlatform("hybrid") ? <IonButton onClick={() => { takePhoto(setIsReportModalOpen); setIsCropped(false); }} color="medium"><IonIcon icon={cameraOutline} /></IonButton> : null}
                            <IonButton onClick={() => { takePhoto(setIsReportModalOpen, true); setIsCropped(false); }} color="medium"><IonIcon icon={imageOutline} /></IonButton>
                        </div>
                    </div>
                    <IonItemDivider />
                </div>
                <OwnLocationMap userLocation={userLocation} setUserLocation={setUserLocation} />
                <IonItemDivider />
                <IonItem>
                    <IonLabel position="floating">Beschreibungstext</IonLabel>
                    <IonTextarea value={description} onIonChange={e => setdescription(e.detail.value)}></IonTextarea>
                </IonItem>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    <IonButton onClick={handleSubmit} color="success"><IonText>Abschicken</IonText></IonButton>
                </div>
            </IonContent>
        </IonModal >
    )
}

export default ReportPostModal;

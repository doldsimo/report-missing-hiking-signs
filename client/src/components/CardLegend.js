import React, { useState } from 'react';
import { IonModal, IonButton, IonContent, IonFab, IonFabButton, IonIcon, IonFabList, IonText } from '@ionic/react';
import { informationCircleOutline, add, settings, share, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, logoVimeo, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';
import { Popup } from 'react-leaflet';

const CardLegend = ({ isLegendOpen, setIsLegendOpen }) => {
    return (

        <IonFab horizontal="end" vertical="top" slot="fixed"  >
            <IonFabButton size="small" color="light" >
                <IonIcon icon={informationCircleOutline} />
            </IonFabButton>
            <IonFabList side="bottom" >
                <IonButton size="small" color="light"><IonIcon icon={logoVimeo} /></IonButton>
                <IonButton size="small" color="light"><IonIcon icon={logoFacebook} /></IonButton>
                <IonButton size="small" color="light"><IonIcon icon={logoInstagram} /></IonButton>
                <IonButton size="small" color="light"><IonIcon icon={logoTwitter} /></IonButton>
            </IonFabList>
        </IonFab>
    )
}

export default CardLegend;

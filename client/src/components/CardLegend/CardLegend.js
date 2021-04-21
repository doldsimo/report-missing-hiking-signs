import React from 'react';
import { IonFab, IonFabButton, IonIcon, IonFabList, IonImg, IonText } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import redMarker from '../../assets/mapMarker/marker-icon-red.png';
import blueMarker from '../../assets/mapMarker/marker-icon-blue.png';

const CardLegend = () => {
    return (
        <IonFab horizontal="end" vertical="top" slot="fixed"  >
            <IonFabButton size="small" color="light" >
                <IonIcon icon={informationCircleOutline} />
            </IonFabButton>
            <IonFabList side="bottom" >
                <div className="legendButton"><IonImg src={redMarker} style={{ maxWidth: "14px", height: "auto", margin: "auto" }} /><IonText ><p style={{ fontSize: "10px", marginTop: "0", textAlign: "center" }}>Deine Position</p></IonText></div>
                <div className="legendButton"><IonImg src={blueMarker} style={{ maxWidth: "14px", height: "auto", margin: "auto" }} /><IonText><p style={{ fontSize: "10px", marginTop: "0", textAlign: "center" }}>Gemeldete Positionen</p></IonText></div>
            </IonFabList>
        </IonFab >
    )
}

export default CardLegend;

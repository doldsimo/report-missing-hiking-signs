import React from 'react';
import { IonButton, IonFab, IonFabButton, IonIcon, IonFabList, } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';

const CardLegend = () => {
    return (
        <IonFab horizontal="end" vertical="top" slot="fixed"  >
            <IonFabButton size="small" color="light" >
                <IonIcon icon={informationCircleOutline} />
            </IonFabButton>
            <IonFabList side="bottom" >
                <IonButton size="small" color="light"><IonIcon icon={informationCircleOutline} /></IonButton>
                <IonButton size="small" color="light"><IonIcon icon={informationCircleOutline} /></IonButton>
                <IonButton size="small" color="light"><IonIcon icon={informationCircleOutline} /></IonButton>
                <IonButton size="small" color="light"><IonIcon icon={informationCircleOutline} /></IonButton>
            </IonFabList>
        </IonFab>
    )
}

export default CardLegend;

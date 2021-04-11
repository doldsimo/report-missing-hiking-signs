import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

import GeolocationView from '../components/GeolocationView/GeolocationView';

const GeolocationTab = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Map GeolocationTab</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GeolocationView />
      </IonContent>
    </IonPage >
  );
}

export default GeolocationTab;

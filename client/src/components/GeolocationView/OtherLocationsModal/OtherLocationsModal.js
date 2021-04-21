import React from 'react';

import { IonButton, IonContent, IonHeader, IonImg, IonModal, IonText, IonTitle, IonToolbar } from '@ionic/react';

const OtherLocationsModal = ({ isModalOpen, setIsModalOpen, otherUserLocation, setOtherUserLocation }) => {
    return (
        <IonModal isOpen={isModalOpen} onDidDismiss={() => { setIsModalOpen(false); setOtherUserLocation(undefined) }}>
            {console.log(otherUserLocation)}
            {/* <IonHeader>
                <IonToolbar>
                    <IonTitle> {otherUserLocation.createdAt}</IonTitle>
                </IonToolbar>
            </IonHeader> */}
            <IonContent>
                <div className="ion-padding">
                    <IonText>

                    </IonText>
                    <div style={{ maxWidth: "500px", margin: "auto" }} className="ion-padding">
                        <IonImg style={{ width: "100%", heigh: "auto" }} src={otherUserLocation.img} />
                    </div>
                    <IonText>
                        <p>
                            Beschreibung:
                       </p>
                    </IonText>
                    <IonText>
                        {" " + otherUserLocation.description}
                    </IonText>
                </div>
            </IonContent>
            <IonButton onClick={() => setIsModalOpen(false)}>Schließen</IonButton>
        </IonModal>
    )
}

export default OtherLocationsModal;

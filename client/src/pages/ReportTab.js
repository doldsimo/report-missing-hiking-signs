import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonTextarea, IonText, IonButton } from '@ionic/react';
import { camera, imagesOutline } from 'ionicons/icons';
import { useState } from 'react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';

const CameraTab = () => {
  const { photos, takePhoto } = usePhotoGallery();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Melden</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Melden</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonText>Melde fehlende Beschilderungen</IonText>
        {/* <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid> */}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => setIsActionSheetOpen(true)}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonActionSheet
          isOpen={isActionSheetOpen}
          onDidDismiss={() => {
            console.log("dismiss");
            setIsActionSheetOpen(false);
          }}
          buttons={[{
            text: 'Kamera',
            role: 'destructive',
            icon: camera,
            handler: () => {
              console.log('Kamera öffnen');
              setIsActionSheetOpen(false);
            }
          }, {
            text: 'Gallery',
            icon: imagesOutline,
            handler: () => {
              console.log('Gallery öffnen');
              setIsActionSheetOpen(false);
            }
          }]}
        >
        </IonActionSheet>
      </IonContent>
    </IonPage>
  );
};

export default CameraTab;

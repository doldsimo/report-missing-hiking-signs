import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonTextarea, IonText, IonButton } from '@ionic/react';
import { camera, imagesOutline } from 'ionicons/icons';
import { useState } from 'react';
import ReportPostModal from '../components/ReportPostModal';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { isPlatform } from '@ionic/react';

const CameraTab = () => {
  const { photo, takePhoto } = usePhotoGallery();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => setIsActionSheetOpen(true)}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonActionSheet
          isOpen={isActionSheetOpen}
          onDidDismiss={() => {
            setIsActionSheetOpen(false);
          }}
          buttons={isPlatform("hybrid") ?
            [
              {
                text: 'Kamera',
                role: 'destructive',
                icon: camera,
                handler: () => {
                  setIsActionSheetOpen(false);
                  takePhoto(setIsReportModalOpen, false);
                }
              }, {
                text: 'Gallery',
                icon: imagesOutline,
                handler: () => {
                  setIsActionSheetOpen(false);
                  takePhoto(setIsReportModalOpen, true);
                }
              }
            ] : [{
              text: 'Gallery',
              icon: imagesOutline,
              handler: () => {
                setIsActionSheetOpen(false);
                takePhoto(setIsReportModalOpen, true);
              }
            }]
          }
        >
        </IonActionSheet>
        <ReportPostModal isReportModalOpen={isReportModalOpen} setIsReportModalOpen={setIsReportModalOpen} photo={photo} takePhoto={takePhoto} />
      </IonContent>
    </IonPage >
  );
};

export default CameraTab;

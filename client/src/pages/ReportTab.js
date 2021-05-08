import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonActionSheet, IonText, useIonViewDidLeave, useIonViewWillEnter, IonButton } from '@ionic/react';
import { camera, imagesOutline, refreshOutline } from 'ionicons/icons';
import React, { useState, useContext, useEffect } from 'react';
import ReportPostModal from '../components/ReportPostModal/ReportPostModal';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { isPlatform } from '@ionic/react';


const CameraTab = () => {
  const { photo, setPhotos, takePhoto, startCameraPreview, stopCameraPreview, flipCameraPreview, takeImageCameraPreview } = usePhotoGallery();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useIonViewWillEnter(() => {
    if (isPlatform("hybrid")) {
      startCameraPreview();
    }
  });

  useIonViewDidLeave(() => {
    if (isPlatform("hybrid")) {
      stopCameraPreview();
    }
  });


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Melden</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen id="content" className="content-camera-preview" >
        {isPlatform("hybrid") ?
          <>
            <IonFab vertical="bottom" horizontal="center" slot="fixed">
              <IonFabButton onClick={() => {
                takeImageCameraPreview();
                setIsReportModalOpen(true);
              }}>
                <IonIcon icon={camera}></IonIcon>
              </IonFabButton>
            </IonFab>
            <IonFab vertical="bottom" horizontal="start" slot="fixed">
              <IonFabButton color="medium" size="small" onClick={() => flipCameraPreview()}>
                <IonIcon icon={refreshOutline}></IonIcon>
              </IonFabButton>
            </IonFab>
            <IonFab vertical="bottom" horizontal="end" slot="fixed"  >
              <IonFabButton color="medium" size="small" onClick={() => takePhoto(setIsReportModalOpen, true)}>
                <IonIcon icon={imagesOutline}></IonIcon>
              </IonFabButton>
            </IonFab>
          </>
          :
          <>
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
          </>
        }

        <ReportPostModal isReportModalOpen={isReportModalOpen} setIsReportModalOpen={setIsReportModalOpen} photo={photo} setPhotos={setPhotos} takePhoto={takePhoto} />
      </IonContent>
    </IonPage >
  );
};

export default CameraTab;

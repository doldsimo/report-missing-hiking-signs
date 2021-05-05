import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonActionSheet, IonText, useIonViewDidLeave, useIonViewWillEnter, IonButton } from '@ionic/react';
import { camera, imagesOutline } from 'ionicons/icons';
import React, { useState, useContext, useEffect } from 'react';
import ReportPostModal from '../components/ReportPostModal/ReportPostModal';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { isPlatform } from '@ionic/react';
import ReportHybrid from '../components/ReportHybrid/ReportHybrid';
import ReportDesktop from '../components/ReportDesktop/ReportDesktop';


const CameraTab = () => {
  const { photo, takePhoto, startCameraPreview, stopCameraPreview, flipCameraPreview, takeImageCameraPreview } = usePhotoGallery();
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
          <div >
            <IonButton
              style={{ zIndex: "99999" }}
              onClick={() => flipCameraPreview()}
            >
              Flip
            </IonButton>
            <IonButton
              style={{ zIndex: "99999" }}
              onClick={async () => {
                takeImageCameraPreview();
                setIsReportModalOpen(true);
              }}
            >
              Take Image
        </IonButton>
          </div>
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

        <ReportPostModal isReportModalOpen={isReportModalOpen} setIsReportModalOpen={setIsReportModalOpen} photo={photo} takePhoto={takePhoto} />
      </IonContent>
    </IonPage >
  );
};

export default CameraTab;

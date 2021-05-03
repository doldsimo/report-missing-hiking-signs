import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonActionSheet, IonText, useIonViewDidLeave, useIonViewWillEnter, IonButton } from '@ionic/react';
import { camera, imagesOutline } from 'ionicons/icons';
import React, { useState, useContext, useEffect } from 'react';
import ReportPostModal from '../components/ReportPostModal/ReportPostModal';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { isPlatform } from '@ionic/react';
import ReportHybrid from '../components/ReportHybrid/ReportHybrid';
import ReportDesktop from '../components/ReportDesktop/ReportDesktop';
import { Plugins } from "@capacitor/core";
import { ScreenOrientation } from '@ionic-native/screen-orientation';


const CameraTab = () => {
  const { photo, takePhoto } = usePhotoGallery();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [hybridPhoto, setHybridPhoto] = useState();

  useIonViewWillEnter(() => {
    if (isPlatform("hybrid")) {
      ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);
      Plugins.CameraPreview.start({
        parent: "content",
        toBack: true,
        position: "rear",
        storeToFile: "false",
      });
    }
  });

  useIonViewDidLeave(() => {
    if (isPlatform("hybrid")) {
      ScreenOrientation.unlock();
      Plugins.CameraPreview.stop();
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
              onClick={() => {
                Plugins.CameraPreview.flip();
              }}
            >
              Flip
            </IonButton>
            <IonButton
              style={{ zIndex: "99999" }}
              onClick={async () => {
                const result = await Plugins.CameraPreview.capture({ quality: 50, height: 100, width: 100 });
                console.log(result);
                const base64PictureData = result.value;
                console.log(base64PictureData);
                setHybridPhoto(base64PictureData);
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
        {console.log("Photo: ", hybridPhoto)}



        <ReportPostModal isReportModalOpen={isReportModalOpen} setIsReportModalOpen={setIsReportModalOpen} photo={isPlatform("hybrid") ? hybridPhoto : photo} takePhoto={takePhoto} />
      </IonContent>
    </IonPage >
  );
};

export default CameraTab;

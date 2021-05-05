import { useState } from "react";
import { Plugins } from "@capacitor/core";
import { useCamera } from '@ionic/react-hooks/camera';
import { CameraResultType, CameraSource } from "@capacitor/core";
import { ScreenOrientation } from '@ionic-native/screen-orientation';


export function usePhotoGallery() {
    const { getPhoto } = useCamera();
    const [photo, setPhotos] = useState({});


    const takePhoto = async (setIsReportModalOpen, isGallery) => {
        try {
            const cameraPhoto = await getPhoto({
                resultType: CameraResultType.DataUrl,
                source: isGallery ? CameraSource.Photos : CameraSource.Camera,
                quality: 100,
                saveToGallery: false,
                // width: "100px",
                // height: "100px"
            });
            setPhotos(cameraPhoto);
            setIsReportModalOpen(true);

        } catch (error) {
            console.log("Foto abgebrochen");
        }
    };

    const startCameraPreview = async () => {
        try {
            ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);
            Plugins.CameraPreview.start({
                parent: "content",
                toBack: true,
                position: "rear",
                storeToFile: false,
                rotateWhenOrientationChanged: false
            });
        } catch (error) {
            console.log("Preview abgebrochen");
        }
    }

    const stopCameraPreview = () => {
        ScreenOrientation.unlock();
        Plugins.CameraPreview.stop();
    }

    const flipCameraPreview = () => {
        Plugins.CameraPreview.flip();
    }

    const takeImageCameraPreview = async () => {
        try {
            const result = await Plugins.CameraPreview.capture({ quality: 100 });
            // console.log(result);
            const base64PictureData = 'data:image/jpg;base64,' + result.value;
            console.log(base64PictureData);
            setPhotos({ dataUrl: base64PictureData });
        } catch (error) {
            console.log("Foto abgebrochen");
        }
    }


    return {
        photo,
        takePhoto,
        startCameraPreview,
        stopCameraPreview,
        flipCameraPreview,
        takeImageCameraPreview
    };
}
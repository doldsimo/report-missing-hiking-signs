import { useState } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { CameraResultType, CameraSource } from "@capacitor/core";


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
            // console.log("cameraPhoto: ", cameraPhoto);
            setPhotos(cameraPhoto);
            setIsReportModalOpen(true);

        } catch (error) {
            console.log("Foto abgebrochen");
        }
    };

    return {
        photo,
        takePhoto
    };
}
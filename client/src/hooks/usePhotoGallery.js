import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";
import { useHistory } from 'react-router';

// Key to get the photos from the filesystem
const PHOTO_STORAGE = "photos";

// Custom hook
export function usePhotoGallery() {
    const { getPhoto } = useCamera();
    const { deleteFile, getUri, readFile, writeFile } = useFilesystem();
    const { get, set } = useStorage();
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
            // safe image in storage
            // set(PHOTO_STORAGE, JSON.stringify(newPhotos));

        } catch (error) {
            console.log("Foto Abgebrochen");
        }
    };

    return {
        photo,
        takePhoto
    };
}
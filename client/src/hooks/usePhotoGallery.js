import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";

// Key to get the photos from the filesystem
const PHOTO_STORAGE = "photos";
// Custom hook
export function usePhotoGallery() {
    const { getPhoto } = useCamera();
    const { deleteFile, getUri, readFile, writeFile } = useFilesystem();
    const { get, set } = useStorage();
    const [photos, setPhotos] = useState([]);

    // For loading the photos when hook loads
    useEffect(() => {
        const loadSaved = async () => {
          const photosString = await get(PHOTO_STORAGE);
          const photos = (photosString ? JSON.parse(photosString) : []);
          for (let photo of photos) {
            const file = await readFile({
              path: photo.filepath,
              directory: FilesystemDirectory.Data
            });
            photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
          }
          setPhotos(photos);
        };
        loadSaved();
      }, [get, readFile]);

    const takePhoto = async () => {
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });
        // For Saving the photo
        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePicture(cameraPhoto, fileName);
        const newPhotos = [savedFileImage, ...photos];
        setPhotos(newPhotos);
        // safe image in storage
        set(PHOTO_STORAGE, JSON.stringify(newPhotos));
    };

    // For saving the photo in the filesystem
    const savePicture = async (photo, fileName) => {
        const base64Data = await base64FromPath(photo?.webPath);
        const savedFile = await writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data
        });

        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory
        return {
            filepath: fileName,
            webviewPath: photo.webPath
        };
    };

    return {
        photos,
        takePhoto
    };
}
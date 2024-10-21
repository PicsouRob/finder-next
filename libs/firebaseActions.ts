import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { firebaseStorage } from "./firabaseConfig";

export const addImageToStorage = async (file: File) => {
    const fileRef = ref(firebaseStorage, `profile-pictures/${file.name}`);

    try {
        await uploadBytes(fileRef, file);
        console.log("File uploaded successfully");
        const downloadUrl = await getDownloadURL(fileRef);

        return downloadUrl;
    } catch (error: any) {
        console.log("Error uploading file: ", error);
    }
}

function getFileNameFromUrl(url: string) {
    const path = url.split('?')[0];  
    const filename = path.substring(path.lastIndexOf('/') + 1);  
    
    return decodeURIComponent(filename);
}

export const deleteImageFromStorage = async (url: string) => {
    const filename: string = getFileNameFromUrl(url);
    const fileRef = ref(firebaseStorage, `${filename}`);
    
    try {
        await deleteObject(fileRef);
        console.log("File deleted successfully");
    } catch (error: any) {
        console.log("Error deleting file: ", error);
    }
}
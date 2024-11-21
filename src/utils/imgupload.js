import app from "../config/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app, "gs://grocery-app-sample.appspot.com");

export default function uploadimg(file) {
    if (!file) {
        return Promise.reject(new Error("No file provided"));
    }

    const fileRef = ref(storage, file.name);

    // Upload file and return the snapshot
    return uploadBytes(fileRef, file)
        .then((snapshot) => {
            console.log("Uploaded a file:", snapshot);
            return snapshot;
        })
        .catch((error) => {
            console.error("Error uploading file:", error);
            throw error;
        });
}

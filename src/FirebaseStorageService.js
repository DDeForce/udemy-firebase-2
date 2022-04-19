import { storage } from "./FirebaseConfig";
import {
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
  ref,
} from "firebase/storage";

// const storage = storage;

const uploadFile = (file, fullfilePath, progressCallback) => {
  const uploadRef = ref(storage, fullfilePath);
  const uploadTask = uploadBytesResumable(uploadRef, file);
  // const uploadTask = StorageRef.child(fullfilePath).put(file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      progressCallback(progress);
    },
    (error) => {
      throw error;
    }
  );

  return uploadTask.then(async () => {
    // const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadUrl;
  });
};

const readFile = () => {};

const deleteFile = (fileDownloadUrl) => {
  const decodedUrl = decodeURIComponent(fileDownloadUrl);
  const startIndex = decodedUrl.indexOf("/o/") + 3;
  const endIndex = decodedUrl.indexOf("?");
  const filePath = decodedUrl.substring(startIndex, endIndex);

  // return StorageRef.child(filePath).delete();
  const fileRef = ref(storage, filePath);

  return deleteObject(fileRef);
};

const FirebaseStorageService = {
  uploadFile,
  readFile,
  deleteFile,
};

export default FirebaseStorageService;

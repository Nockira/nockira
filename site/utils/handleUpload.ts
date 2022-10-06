import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

export const handleUpload = async ({ file, key }: any) => {
  const storageRef = ref(storage, key);

  return uploadBytes(storageRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref).then((downloadURL) => {
        return downloadURL;
      });
    })
    .catch((e) => {
      console.log(e);
      throw Error(e.message);
    });
};

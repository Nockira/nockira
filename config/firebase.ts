import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const config = {
  apiKey: "AIzaSyBt1yoik3T8g3pewRS48a2KnUMIkvelibw",
  authDomain: "john-liquors.firebaseapp.com",
  projectId: "john-liquors",
  storageBucket: "john-liquors.appspot.com",
  messagingSenderId: "455173296607",
  appId: "1:455173296607:web:a3a7f413178c6be823746a",
  measurementId: "G-DYRXFBYNKC",
};

if (!getApps().length) {
  enableIndexedDbPersistence(getFirestore(initializeApp(config))).catch(
    (err) => {
      if (err.code == "failed-precondition") {
        console.log(err);
      } else if (err.code == "unimplemented") {
        console.log(err);
      }
    }
  );
}

const auth = getAuth(initializeApp(config));
const functions = getFunctions(initializeApp(config));
const firestore = getFirestore(initializeApp(config));
const storage = getStorage(initializeApp(config));

export function docToJSON(doc: any) {
  const data = doc.data();
  return {
    ...data,
    id: doc.id,
    createdAt: data?.createdAt?.toMillis() || 0,
    updatedAt: data?.updatedAt?.toMillis() || 0,
    date: data?.date?.toMillis() || 0,
  };
}

export { firestore, auth, functions, storage };

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const config = {
  apiKey: "AIzaSyCE1RPJyvOxlK9oRxm8Tke1j2_KByGokh8",
  authDomain: "my-pro-363712.firebaseapp.com",
  projectId: "my-pro-363712",
  storageBucket: "my-pro-363712.appspot.com",
  messagingSenderId: "473885907050",
  appId: "1:473885907050:web:804223cb7157b50bca1213",
  measurementId: "G-EVL87BVPES",
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

// connectFunctionsEmulator(functions, "localhost", 5001);

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

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const config = {
  apiKey: "AIzaSyBi4Rc4qCoP-vlf-H5Ouv_-m3XQOotBO80",
  authDomain: "nockira-a2f9f.firebaseapp.com",
  projectId: "nockira-a2f9f",
  storageBucket: "nockira-a2f9f.firebasestorage.app",
  messagingSenderId: "898938226142",
  appId: "1:898938226142:web:0bab1297ecd5ce8920094f",
  measurementId: "G-963MM5N968",
};

export const firebaseApp = !getApps().length ? initializeApp(config) : getApp();

console.log(firebaseApp);
const functions = getFunctions(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

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

import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";
import * as fs from "./fsConfig";
import {
  getFirestore,
  getDocs,
  orderBy,
  collection,
  query,
} from "firebase/firestore/lite";
import { getAuth, signInAnonymously } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(fs.firebaseConfig);

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(fs.appCheck),

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   isTokenAutoRefreshEnabled: true,
// });
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const authenticateAnonymously = () => {
  return signInAnonymously(getAuth(app));
};

export function getResults() {
  const tournaments = getDocs(
    query(collection(db, "results"), orderBy("EPOCH", "asc"))
  );
  return tournaments;
}

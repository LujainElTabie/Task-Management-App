import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCt-nccdaWl_l_HrQBBBZMQ2JfzDibCn9A",
  authDomain: "task-management-app-7ca72.firebaseapp.com",
  projectId: "task-management-app-7ca72",
  storageBucket: "task-management-app-7ca72.appspot.com",
  messagingSenderId: "649755463155",
  appId: "1:649755463155:web:28c96eb84b0fbd5a8ad686",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

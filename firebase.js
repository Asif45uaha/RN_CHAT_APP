
import { initializeApp } from "@firebase/app";

import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCO9oYCZJZx7CSWb38w_8JI61AAuHUidVI",
    authDomain: "reactnativechat-b30ec.firebaseapp.com",
    projectId: "reactnativechat-b30ec",
    storageBucket: "reactnativechat-b30ec.appspot.com",
    messagingSenderId: "231589092950",
    appId: "1:231589092950:web:9f880250b60136390ba5f7"
};


const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }

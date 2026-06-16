import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDoTj6GZLhnYe2ewYA80UlLv8SP-MSKrbs",
  authDomain: "whatsapp-5e25f.firebaseapp.com",
  projectId: "whatsapp-5e25f",
  storageBucket: "whatsapp-5e25f.firebasestorage.app",
  messagingSenderId: "551179188107",
  appId: "1:551179188107:web:31bdc55f5575ff3a3f218e",
  measurementId: "G-2V53BRYZ2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

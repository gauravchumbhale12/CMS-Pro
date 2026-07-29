import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjHPafUpkUCvTLjlghC_b4zb6phsfs6c8",
  authDomain: "cms-pro-560ff.firebaseapp.com",
  projectId: "cms-pro-560ff",
  storageBucket: "cms-pro-560ff.firebasestorage.app",
  messagingSenderId: "284825013447",
  appId: "1:284825013447:web:f53430443adcf0845ec2e2",
  measurementId: "G-N4ZDRKN35N",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
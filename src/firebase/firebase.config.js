



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc_zziS7Rverk3Qxc9GYLQeFNaAHIDSos",
  authDomain: "productdashboardpaymentsystem.firebaseapp.com",
  projectId: "productdashboardpaymentsystem",
  storageBucket: "productdashboardpaymentsystem.appspot.com",
  messagingSenderId: "333866823538",
  appId: "1:333866823538:web:17e0e99c2971c8f1ab77eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth=getAuth(app)

export default auth;
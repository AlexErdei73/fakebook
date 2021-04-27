import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyA6giH2VCl9pBrO86uGH3gcwbmeM-dYMPM",
  authDomain: "fakebook-2df7b.firebaseapp.com",
  projectId: "fakebook-2df7b",
  storageBucket: "fakebook-2df7b.appspot.com",
  messagingSenderId: "1030600439600",
  appId: "1:1030600439600:web:98617c1d503260115cfaf5",
  measurementId: "G-YN35E2SN2E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

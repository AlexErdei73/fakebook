import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "./firebaseConfig";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense>
    <Suspense fallback={<div>Loading ...</div>}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById("root")
);

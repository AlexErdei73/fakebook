import React from "react";
import ReactDOM from "react-dom";
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "./firebaseConfig";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Provider store={store}>
      <App />
    </Provider>
  </FirebaseAppProvider>,
  document.getElementById("root")
);

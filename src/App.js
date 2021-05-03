import React from "react";
import "./App.css";
import { useFirebaseApp } from "reactfire";

function App() {
  const firebase = useFirebaseApp();
  console.log(firebase);
  return (
    //some code
    <h1>Fakebook</h1>
  );
}

export default App;

import React from "react";
import "./App.css";
import { useFirebaseApp } from "reactfire";
import Signup from "./components/signup";

function App() {
  const firebase = useFirebaseApp();
  return (
    <>
      <h1>fakebook</h1>
      <Signup className="signup"></Signup>;
    </>
  );
}

export default App;

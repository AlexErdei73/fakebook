import React from "react";
import { useFirebaseApp } from "reactfire";
import "firebase/auth";

const Logout = () => {
  // Import firebase
  const firebase = useFirebaseApp();

  // Log out function
  const handleClick = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        Log Out
      </button>
    </>
  );
};

export default Logout;

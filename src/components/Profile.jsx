import React, { useState } from "react";
import { useFirestore, useFirestoreDocDataOnce, StorageImage } from "reactfire";
import "firebase/firestore";
import "firebase/storage";

const Profile = (props) => {
  const firestore = useFirestore();

  const profileRef = firestore.collection("users").doc(props.userID);
  const result = useFirestoreDocDataOnce(profileRef);

  const { firstname, lastname, profilePictureURL, backgroundPictureURL } =
    result.data;

  return (
    <h1 className="mt-5">
      {firstname} {lastname}
    </h1>
  );
};

export default Profile;

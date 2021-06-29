import React, { useState } from "react";
import { useFirestore, useFirestoreDocDataOnce, StorageImage } from "reactfire";
import CircularImage from "./CircularImage";
import "firebase/firestore";
import "firebase/storage";

const ProfileLink = (props) => {
  const userDocRef = useFirestore().collection("users").doc(props.userID);
  const result = useFirestoreDocDataOnce(userDocRef);

  const { firstname, profilePictureURL } = result.data;

  return (
    <>
      <CircularImage size="26" url={profilePictureURL} />
      <span className="mx-1 text-dark" style={{ pointerEvents: "none" }}>
        <b>{firstname}</b>
      </span>
    </>
  );
};

export default ProfileLink;

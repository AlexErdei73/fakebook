import React, { useState } from "react";
import { useFirestore, useFirestoreDocDataOnce, StorageImage } from "reactfire";
import "firebase/firestore";
import "firebase/storage";

const ProfileLink = (props) => {
  const userDocRef = useFirestore().collection("users").doc(props.userID);
  const result = useFirestoreDocDataOnce(userDocRef);

  const { firstname, profilePictureURL } = result.data;

  return (
    <>
      <StorageImage
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "13px",
          display: "inline-block",
          pointerEvents: "none",
        }}
        storagePath={profilePictureURL}
      />
      <span className="mx-1 text-dark" style={{ pointerEvents: "none" }}>
        <b>{firstname}</b>
      </span>
    </>
  );
};

export default ProfileLink;

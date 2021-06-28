import React, { useState } from "react";
import { useFirestore, useFirestoreDocDataOnce, StorageImage } from "reactfire";
import "firebase/firestore";
import "firebase/storage";

const Profile = (props) => {
  const profileRef = useFirestore().collection("users").doc(props.userID);
  const result = useFirestoreDocDataOnce(profileRef);

  const { firstname, lastname, profilePictureURL, backgroundPictureURL } =
    result.data;

  return (
    <>
      <StorageImage
        style={{
          display: "block",
          width: "85%",
          height: "363px",
          objectFit: "cover",
          margin: "auto",
          marginTop: "3.5%",
          borderRadius: "13px",
          pointerEvents: "none",
        }}
        storagePath={backgroundPictureURL}
      />
      <h2 className="text-center mt-4">
        <b>
          {firstname} {lastname}
        </b>
      </h2>
    </>
  );
};

export default Profile;

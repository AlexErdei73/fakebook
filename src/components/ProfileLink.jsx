import React, { useState } from "react";
import { useFirebaseApp, useFirestore, StorageImage } from "reactfire";
import "firebase/firestore";
import "firebase/storage";

const ProfileLink = (props) => {
  const [firstname, setFirstname] = useState("");
  const [profilePictureURL, setProfilePictureURL] = useState(
    "fakebook-avatar.jpeg"
  );

  const userDocRef = useFirestore().collection("users").doc(props.userID);
  if (props.isLoggedIn) {
    userDocRef.get().then((doc) => {
      const { firstname, profilePictureURL } = doc.data();
      setFirstname(firstname);
      setProfilePictureURL(profilePictureURL);
    });
  }

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

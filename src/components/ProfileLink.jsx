import React from "react";
import { useFirestore, useFirestoreDocDataOnce } from "reactfire";
import CircularImage from "./CircularImage";

const ProfileLink = (props) => {
  const userDocRef = useFirestore().collection("users").doc(props.userID);
  const result = useFirestoreDocDataOnce(userDocRef);

  const { firstname, profilePictureURL } = result.data;

  return (
    <div style={{ width: "100px" }}>
      <CircularImage size="26" url={profilePictureURL} />
      <span className="mx-1" style={{ pointerEvents: "none" }}>
        <b>{firstname}</b>
      </span>
    </div>
  );
};

export default ProfileLink;

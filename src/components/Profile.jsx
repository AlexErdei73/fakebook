import React from "react";
import { useFirestore, useFirestoreDocDataOnce, StorageImage } from "reactfire";
import CircularImage from "./CircularImage";
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
          zIndex: "-1",
        }}
        storagePath={backgroundPictureURL}
      />
      <div
        style={{
          width: "190px",
          height: "190px",
          backgroundColor: "white",
          borderRadius: "95px",
          padding: "5px",
          position: "absolute",
          top: "40%",
          left: "43%",
        }}
      >
        <CircularImage size="180" url={profilePictureURL} />
      </div>
      <h2 className="text-center mt-5">
        <b>
          {firstname} {lastname}
        </b>
      </h2>
    </>
  );
};

export default Profile;

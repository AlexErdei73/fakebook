import React from "react";
import CircularImage from "./CircularImage";

const ProfileLink = (props) => {
  const { firstname, profilePictureURL } = props.user;

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

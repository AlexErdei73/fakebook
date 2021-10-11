import React from "react";
import { useParams } from "react-router-dom";
import Photos from "./Photos";
import Friends from "./Friends";
import Posts from "./Posts";

const NestedRoute = (props) => {
  const { itemId } = useParams();

  const {
    photos,
    userID,
    openFileInput,
    users,
    isCurrentUser,
    photosLinkRef,
    activeLink,
    setActiveLink,
  } = props;

  if (itemId === "Photos")
    return (
      <Photos
        photos={photos}
        userID={userID}
        openFileInput={openFileInput}
        isCurrentUser={isCurrentUser}
      />
    );
  if (itemId === "Friends") return <Friends users={users} />;
  else
    return (
      <Posts
        userID={userID}
        users={users}
        photosLinkRef={photosLinkRef}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      ></Posts>
    );
};

export default NestedRoute;

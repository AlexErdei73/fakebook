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
    friendsLinkRef,
    postsLinkRef,
    activeLink,
    setActiveLink,
  } = props;

  if (itemId === "Photos")
    return (
      <Photos
        photos={photos}
        userID={userID}
        //the rendering of the component changes the activeLink
        openFileInput={openFileInput}
        isCurrentUser={isCurrentUser}
        photosLinkRef={photosLinkRef}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />
    );
  if (itemId === "Friends")
    return (
      <Friends
        users={users}
        //the rendering of the component changes the activeLink
        friendsLinkRef={friendsLinkRef}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />
    );
  else
    return (
      <Posts
        userID={userID}
        //the rendering of the component changes the activeLink
        photosLinkRef={photosLinkRef}
        friendsLinkRef={friendsLinkRef}
        postsLinkRef={postsLinkRef}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      ></Posts>
    );
};

export default NestedRoute;

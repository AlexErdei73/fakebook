import React from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";
import DisplayPost from "./DisplayPost";

const DisplayUserPost = (props) => {
  const { postID, userID, ...rest } = props;

  const INIT_POST = {
    userID: `${userID}`,
    text: "",
    isPhoto: false,
    photoURL: "",
    likes: [],
  };

  const firestore = useFirestore();
  const postRef = firestore.collection("posts").doc(postID);
  const post = useFirestoreDocData(postRef, { initialData: INIT_POST }).data;

  return <DisplayPost post={post} postID={postID} userID={userID} {...rest} />;
};

export default DisplayUserPost;

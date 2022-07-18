import React from "react";
import DisplayPost from "./DisplayPost";
import { useSelector } from "react-redux";

const DisplayUserPost = (props) => {
  const { postID, userID, ...rest } = props;

  const posts = useSelector((state) => state.posts);
  const post = posts.find((post) => post.postID === postID);

  return <DisplayPost post={post} postID={postID} userID={userID} {...rest} />;
};

export default DisplayUserPost;

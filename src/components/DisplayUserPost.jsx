import React from "react";
import DisplayPost from "./DisplayPost";
import { useSelector } from "react-redux";

const DisplayUserPost = (props) => {
  const { postID } = props;

  const posts = useSelector((state) => state.posts);
  const post = posts.find((post) => post.postID === postID);

  return <DisplayPost post={post} />;
};

export default DisplayUserPost;

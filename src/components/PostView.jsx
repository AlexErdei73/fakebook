import React from "react";
import CreatePost from "./CreatePost";
import DisplayPost from "./DisplayPost";
import { useSelector } from "react-redux";

const PostView = () => {
  const posts = useSelector((state) => state.posts);

  return (
    <>
      <CreatePost
        isCurrentUser={true}
        className="mw-100 m-auto p-0"
        style={{ width: "450px" }}
      />
      {posts.map((post, index) => {
        return (
          <DisplayPost
            key={index}
            post={post}
            className="mw-100 mx-auto my-2"
            style={{ width: "450px" }}
          />
        );
      })}
    </>
  );
};

export default PostView;

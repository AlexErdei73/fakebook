import React from "react";
import CreatePost from "./CreatePost";
import DisplayPost from "./DisplayPost";

const PostView = (props) => {
  const { user, userID, posts, users } = props;

  return (
    <>
      <CreatePost user={user} userID={userID} className="w-75 m-auto p-0" />
      {posts.map((post, index) => {
        return (
          <DisplayPost
            key={index}
            post={post}
            postID={post.postID}
            users={users}
            userID={userID}
            className="w-75 mx-auto my-2"
          />
        );
      })}
    </>
  );
};

export default PostView;

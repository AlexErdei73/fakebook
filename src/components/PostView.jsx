import React from "react";
import CreatePost from "./CreatePost";
import DisplayPost from "./DisplayPost";

const PostView = (props) => {
  const { user, userID, posts, users } = props;

  return (
    <>
      <CreatePost
        user={user}
        userID={userID}
        isCurrentUser={true}
        className="mw-100 m-auto p-0"
        style={{ width: "450px" }}
      />
      {posts.map((post, index) => {
        return (
          <DisplayPost
            key={index}
            post={post}
            postID={post.postID}
            users={users}
            userID={userID}
            className="mw-100 mx-auto my-2"
            style={{ width: "450px" }}
          />
        );
      })}
    </>
  );
};

export default PostView;

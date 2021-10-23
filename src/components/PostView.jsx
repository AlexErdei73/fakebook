import React from "react";

const PostView = (props) => {
  const { user, userID, posts } = props;

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

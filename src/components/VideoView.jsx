import React from "react";
import DisplayPost from "./DisplayPost";

const VideoView = (props) => {
  const { posts, users, userID } = props;

  const videos = posts.filter((post) => post.isYoutube);

  return (
    <>
      {videos.map((video, index) => (
        <DisplayPost
          key={index}
          post={video}
          postID={video.postID}
          users={users}
          userID={userID}
        />
      ))}
    </>
  );
};

export default VideoView;

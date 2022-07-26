import React from "react";
import DisplayPost from "./DisplayPost";
import { useSelector } from "react-redux";

const VideoView = () => {
  const posts = useSelector((state) => state.posts);

  const videos = posts.filter((post) => post.isYoutube);

  return (
    <>
      {videos.map((video, index) => (
        <DisplayPost
          key={index}
          post={video}
          className="mw-100 mx-auto my-2"
          style={{ width: "550px" }}
        />
      ))}
    </>
  );
};

export default VideoView;

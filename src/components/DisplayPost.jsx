import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import StorageImage from "./StorageImage";
import ProfileLink from "./ProfileLink";
import LikesModal from "./LikesModal";
import Comments from "./Comments";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { useSelector } from "react-redux";
import { updatePost } from "../backend/backend";

const DisplayPost = (props) => {
  const { post, ...rest } = props;

  const userID = useSelector((state) => state.user.id);
  const users = useSelector((state) => state.users);

  const [show, setShow] = useState(false);

  const [showComments, setShowComments] = useState(false);

  function handleHide() {
    setShow(false);
  }

  //We avoid error if post is undefind
  if (!post) return <></>;

  const postID = post.postID;

  const user = users.find((user) => user.userID === post.userID);

  function index() {
    return post.likes.indexOf(userID);
  }

  function isLiked() {
    return !(index() === -1);
  }

  function handleClick() {
    const likes = [...post.likes];
    const index = likes.indexOf(userID);
    if (index === -1) likes.push(userID);
    else likes.splice(index, 1);
    updatePost({ likes: likes }, postID);
  }

  function handleCommentClick() {
    setShowComments(true);
  }

  return (
    <Card {...rest}>
      <Card.Header>
        <ProfileLink user={user} size="40" fullname="true" bold="true" />
        <span
          style={{
            fontSize: "12px",
          }}
        >
          {post.timestamp}
        </span>
      </Card.Header>
      <Card.Body>
        <Card.Text>{post.text}</Card.Text>
        {post.isPhoto && (
          <StorageImage alt="" storagePath={post.photoURL} className="w-100" />
        )}
        {post.isYoutube && (
          <div className="video-container">
            <iframe
              src={post.youtubeURL}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </Card.Body>
      <Card.Footer>
        <Button
          variant="link"
          className="text-muted"
          onClick={() => {
            if (post.likes.length > 0) setShow(true);
          }}
          style={{ boxShadow: "none" }}
        >
          <AiFillLike
            className="bg-primary text-light mr-2"
            style={{ borderRadius: "50%" }}
            aria-label="likes"
          />
          {post.likes.length}
        </Button>
        <Button
          variant="link"
          className="text-muted float-right"
          onClick={() => setShowComments(!showComments)}
          style={{ boxShadow: "none" }}
        >
          comments({post.comments ? post.comments.length : 0})
        </Button>
        <hr />
        <Button
          variant="light"
          className={`${isLiked() ? "text-primary" : "text-muted"} w-50`}
          onClick={handleClick}
        >
          {isLiked() ? (
            <AiFillLike size="22px" />
          ) : (
            <AiOutlineLike size="22px" />
          )}
          <b> Like</b>
        </Button>
        <Button
          variant="light"
          className="text-muted w-50"
          onClick={handleCommentClick}
        >
          <GoComment size="22px" />
          <b> Comment</b>
        </Button>
        {showComments && <Comments post={post} />}
      </Card.Footer>

      <LikesModal show={show} onHide={handleHide} likes={post.likes} />
    </Card>
  );
};

export default DisplayPost;

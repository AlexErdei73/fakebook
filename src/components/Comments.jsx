import React, { useState } from "react";
import { Col, Row, CloseButton, Button } from "react-bootstrap";
import StorageImage from "./StorageImage";
import CircularImage from "./CircularImage";
import UploadPhoto from "./UploadPhoto";
import DisplayComment from "./DisplayComment";
import StyledTextarea from "./StyledTextarea";
import { MdPhotoCamera } from "react-icons/md";
import { MdSend } from "react-icons/md";
import {
  addPhoto,
  handleTextareaChange,
  delPhoto,
  handleKeyPress,
} from "./helper";
import "./Comments.css";
import { useSelector } from "react-redux";
import { updatePost } from "../backend/backend";

const Comments = (props) => {
  const { post } = props;

  const user = useSelector((state) => state.currentUser);
  const userID = useSelector((state) => state.user.id);

  const WELCOME_TEXT = "Write a comment ...";
  const INIT_COMMENT = {
    userID: userID,
    text: "",
    isPhoto: false,
    photoURL: "",
  };
  const [comment, setComment] = useState(INIT_COMMENT);

  const [show, setShow] = useState(false);

  function handleChange(e) {
    handleTextareaChange({
      e: e,
      state: comment,
      setState: setComment,
    });
  }

  function addPhotoToComment(file) {
    addPhoto({
      state: comment,
      setState: setComment,
      file: file,
      userID: userID,
    });
  }

  function deletePhoto() {
    delPhoto({
      state: comment,
      setState: setComment,
      user: user,
      userID: userID,
    });
  }

  function saveComment() {
    if (comment.text === "" && !comment.isPhoto) return;
    const newPost = {
      ...post,
      comments: [],
    };
    const postID = post.postID;
    if (post.comments) newPost.comments = [...post.comments];
    newPost.comments.push(comment);
    updatePost(newPost, postID);
    setComment(INIT_COMMENT);
  }

  return (
    <Col>
      <hr />
      {post.comments &&
        post.comments.map((comment, index) => (
          <DisplayComment key={index} comment={comment} className="mb-2" />
        ))}
      <Row>
        <Col xs={1}>
          <CircularImage size="36" url={user.profilePictureURL} />
        </Col>
        <Col xs={11}>
          <Row
            style={{
              background: "#e9ecef",
              borderRadius: "18px",
              marginLeft: "5px",
            }}>
            <Col xs={9} className="align-self-center">
              <StyledTextarea
                onChange={handleChange}
                onKeyPress={(e) => handleKeyPress(e, saveComment)}
                welcomeText={WELCOME_TEXT}
                value={comment.text}
                className="w-100 mt-2"
              />
            </Col>
            <Col xs={3}>
              <Row className="justify-content-end align-items-baseline">
                <Button
                  variant="light"
                  size="sm"
                  className="comment-btn"
                  onClick={() => setShow(true)}
                  disabled={comment.isPhoto}>
                  <MdPhotoCamera
                    size="18px"
                    className="text-muted"
                    aria-label="photo"
                  />
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  className="comment-btn"
                  onClick={() => saveComment()}>
                  <MdSend
                    size="18px"
                    className="text-primary"
                    aria-label="send"
                  />
                </Button>
              </Row>
            </Col>
          </Row>
          {comment.isPhoto && (
            <div className="comment-img-container">
              <StorageImage
                alt=""
                storagePath={`/${comment.photoURL}`}
                className="img-to-comment"
              />
              <div id="close-btn-container">
                <CloseButton onClick={deletePhoto} />
              </div>
            </div>
          )}
        </Col>
      </Row>

      <UploadPhoto
        show={show}
        setShow={setShow}
        updatePost={addPhotoToComment}
      />
    </Col>
  );
};

export default Comments;

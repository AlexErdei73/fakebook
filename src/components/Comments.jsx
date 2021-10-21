import React, { useState, useEffect } from "react";
import { Col, Row, CloseButton, Button } from "react-bootstrap";
import { StorageImage, useStorage, useFirestore } from "reactfire";
import CircularImage from "./CircularImage";
import UploadPhoto from "./UploadPhoto";
import DisplayComment from "./DisplayComment";
import { MdPhotoCamera } from "react-icons/md";
import { addPhoto, handleTextareaChange, delPhoto } from "./helper";
import "./Comments.css";

const Comments = (props) => {
  const { user, post, updatePost, users } = props;

  const WELCOME_TEXT = "Write a comment ...";
  const INIT_COMMENT = {
    userID: `${user.userID}`,
    text: "",
    isPhoto: false,
    photoURL: "",
  };
  const [comment, setComment] = useState(INIT_COMMENT);
  const TEXTAREA_STYLE_INIT = {
    outline: "none",
    border: "none",
    resize: "none",
    overflowY: "none",
    background: "#e9ecef",
    padding: "0",
    lineHeight: "0.8em",
  };
  const [style, setStyle] = useState(TEXTAREA_STYLE_INIT);
  const [textarea, setTextarea] = useState(null); //We save the textarea in the state, so the effect hook can use it

  const [show, setShow] = useState(false);

  function handleChange(e) {
    handleTextareaChange({
      e: e,
      state: comment,
      setState: setComment,
    });
    const textarea = e.target;
    setTextarea(textarea);
    restyleTextarea(textarea);
  }

  //When content changes we first change the height to auto,
  //which changes back the scrollHeight property of the textarea
  //to a low value and the component rerenders
  function restyleTextarea(textarea) {
    const newStyle = { ...style };
    newStyle.height = "auto";
    setStyle(newStyle);
  }

  //When the component has rerendered and the height is auto
  //we set the height to the scrollHeight property of textarea
  //This way when the height of the content decreses the textarea
  //can follow it down too. Without this trick the textarea can
  //grow but unable to shrink back.
  useEffect(() => {
    if (style.height !== "auto") return;
    const newStyle = { ...style };
    newStyle.height = textarea.scrollHeight + "px";
    setStyle(newStyle);
  }, [style.height]);

  function addPhotoToComment(file) {
    addPhoto({
      state: comment,
      setState: setComment,
      file: file,
      userID: user.userID,
    });
  }

  const storage = useStorage();

  function deletePhoto() {
    delPhoto({
      state: comment,
      setState: setComment,
      user: user,
      userID: user.userID,
      storage: storage,
    });
  }

  function handleKeyPress(e) {
    const code = e.code;
    if (code !== "Enter") return;
    e.preventDefault();
    saveComment();
  }

  function saveComment() {
    const newPost = { ...post };
    if (!post.comments) newPost.comments = [];
    newPost.comments.push(comment);
    updatePost(newPost);
    setComment(INIT_COMMENT);
  }

  return (
    <Col>
      <hr />
      {post.comments &&
        post.comments.map((comment, index) => (
          <DisplayComment
            key={index}
            comment={comment}
            users={users}
            className="mb-2"
          />
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
            }}
          >
            <Col xs={11} className="align-self-center">
              <textarea
                type="text"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="w-100 mt-2"
                placeholder={WELCOME_TEXT}
                rows="1"
                style={style}
                value={comment.text}
              ></textarea>
            </Col>
            <Col xs={1}>
              <Row className="justify-content-center align-items-baseline">
                <Button
                  variant="light"
                  size="sm"
                  id="add-photo-btn"
                  onClick={() => setShow(true)}
                  disabled={comment.isPhoto}
                >
                  <MdPhotoCamera size="23px" className="text-muted" />
                </Button>
              </Row>
            </Col>
          </Row>
          {comment.isPhoto && (
            <div id="comment-img-container">
              <StorageImage
                alt=""
                storagePath={`/${comment.photoURL}`}
                id="img-to-comment"
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
        updateDatabase={addPhotoToComment}
        userID={user.userID}
      />
    </Col>
  );
};

export default Comments;

import React, { useState, useEffect } from "react";
import { Col, Row, CloseButton } from "react-bootstrap";
import { StorageImage } from "reactfire";
import CircularImage from "./CircularImage";

const Comments = (props) => {
  const { user } = props;

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
  const [textarea, setTextarea] = useState(null);

  function handleChange(e) {
    const textarea = e.target;
    let value = textarea.value;
    const newComment = { ...comment };
    newComment.text = value;
    setComment(newComment);
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
  //can follow it down too
  useEffect(() => {
    if (style.height !== "auto") return;
    const newStyle = { ...style };
    newStyle.height = textarea.scrollHeight + "px";
    setStyle(newStyle);
  }, [style.height]);

  return (
    <Col>
      <hr />
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
                className="w-100 mt-2"
                placeholder={WELCOME_TEXT}
                rows="1"
                style={style}
                //id="textarea"
                value={comment.text}
              ></textarea>
            </Col>
            <Col xs={1}></Col>
          </Row>
          {comment.isPhoto && (
            <div className="mb-2" id="img-container">
              <StorageImage
                alt=""
                storagePath={`/${comment.photoURL}`}
                className="w-100"
                id="img-to-post"
              />
              <div id="close-btn-container">
                <CloseButton /*onClick={deletePhoto}*/ />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default Comments;

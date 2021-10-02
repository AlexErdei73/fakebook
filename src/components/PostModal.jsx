import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ProfileLink from "./ProfileLink";
import { HiOutlinePhotograph } from "react-icons/hi";

const PostModal = (props) => {
  const { show, onClose, user } = props;

  const WELCOME_TEXT = `What's on your mind, ${user.firstname}?`;
  const [text, setText] = useState("");

  function handleChange(e) {
    let value = e.target.value;
    setText(value);
    if (value === "") setBtnEnabled(false);
    else setBtnEnabled(true);
  }

  const [isBtnEnabled, setBtnEnabled] = useState(false);
  let variant, disabled;
  if (isBtnEnabled) {
    variant = "primary";
    disabled = false;
  } else {
    variant = "secondary";
    disabled = true;
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <div className="w-100 d-flex justify-content-center">
          <Modal.Title>
            <b>Create Post</b>
          </Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <ProfileLink user={user} size="45" fullname="true" bold="true" />
        <textarea
          type="text"
          onChange={handleChange}
          className="w-100"
          placeholder={WELCOME_TEXT}
          rows="5"
          style={{
            outline: "none",
            border: "none",
            fontSize: "1.7em",
            resize: "none",
          }}
        >
          {text}
        </textarea>
        <div
          className="w-100"
          style={{
            border: "2px solid lightgray",
            borderRadius: "5px",
            padding: "16px",
            fontSize: "14px",
          }}
        >
          {" "}
          <b>Add to your post</b>
          <Button
            className="ml-5"
            variant="light"
            size="sm"
            style={{
              borderRadius: "50%",
              border: "none",
            }}
          >
            <HiOutlinePhotograph size="26px" className="text-success" />
          </Button>
        </div>
        <Button variant={variant} className="w-100 mt-3" disabled={disabled}>
          <b>Post</b>
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;

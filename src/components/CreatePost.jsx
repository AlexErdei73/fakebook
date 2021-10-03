import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import CircularImage from "./CircularImage";
import PostModal from "./PostModal";
import "./CreatePost.css";
import { HiOutlinePhotograph } from "react-icons/hi";

const CreatePost = (props) => {
  const [showPostModal, setShowPostModal] = useState(false);

  const [text, setText] = useState("");

  const handleClose = () => setShowPostModal(false);

  const handleClick = () => setShowPostModal(true);

  function getText() {
    const MAX_LENGTH = 55;
    const length = text.length;
    if (length === 0) return `What's on your mind ${props.user.firstname}?`;
    else {
      let newText = text.slice(0, MAX_LENGTH);
      if (length > MAX_LENGTH) newText += "...";
      return newText;
    }
  }

  return (
    <>
      <Card className="w-75 m-auto p-0" id="card">
        <Card.Body>
          <Card.Title>
            <CircularImage size="40" url={props.user.profilePictureURL} />
            <div
              id="text-div"
              className="p-2 w-75 text-dark"
              onClick={handleClick}
            >
              {getText()}
            </div>
          </Card.Title>
          <hr></hr>
          <Button
            variant="light"
            id="photo-btn"
            size="sm"
            onClick={handleClick}
          >
            <HiOutlinePhotograph size="28px" className="text-success" />
            Photo/Video
          </Button>
        </Card.Body>
      </Card>

      <PostModal
        show={showPostModal}
        onClose={handleClose}
        user={props.user}
        userID={props.userID}
        setText={setText}
      />
    </>
  );
};

export default CreatePost;

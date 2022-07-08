import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import CircularImage from "./CircularImage";
import PostModal from "./PostModal";
import "./CreatePost.css";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AiFillYoutube } from "react-icons/ai";

const CreatePost = (props) => {
  const { user, userID, firstname, isCurrentUser, ...rest } = props;

  const PLACEHOLDER_FOR_CURRENT_USER = `What's on your mind ${user.firstname}?`;
  const PLACEHOLDER_FOR_ANOTHER_USER = `Write something to ${firstname}`;

  const [showPostModal, setShowPostModal] = useState(false);
  const [isYoutubeBtnPressed, setYoutubeBtnPressed] = useState(false);

  const [text, setText] = useState("");

  const handleClose = () => {
    setShowPostModal(false);
    setYoutubeBtnPressed(false);
  };

  const handleClick = () => setShowPostModal(true);

  const handleYoutubeBtnClick = () => {
    setYoutubeBtnPressed(true);
    setShowPostModal(true);
  };

  function getPlaceholder() {
    if (isCurrentUser) return PLACEHOLDER_FOR_CURRENT_USER;
    else return PLACEHOLDER_FOR_ANOTHER_USER;
  }

  function getText() {
    const MAX_LENGTH = 55;
    const length = text.length;
    if (length === 0) return getPlaceholder();
    else {
      let newText = text.slice(0, MAX_LENGTH);
      if (length > MAX_LENGTH) newText += "...";
      return newText;
    }
  }

  return (
    <>
      <Card className="create-post-card" {...rest}>
        <Card.Body>
          <Card.Title>
            <CircularImage size="40" url={user.profilePictureURL} />
            <div className="p-2 w-75 text-dark text-div" onClick={handleClick}>
              {getText()}
            </div>
          </Card.Title>
          <hr></hr>
          <Button
            variant="light"
            className="add-btn"
            size="sm"
            onClick={handleYoutubeBtnClick}
          >
            <AiFillYoutube size="28px" className="text-danger" />
            YouTube
          </Button>
          <Button
            variant="light"
            className="add-btn"
            size="sm"
            onClick={handleClick}
          >
            <HiOutlinePhotograph size="28px" className="text-success" />
            Photo
          </Button>
        </Card.Body>
      </Card>

      <PostModal
        show={showPostModal}
        onClose={handleClose}
        user={user}
        userID={userID}
        setText={setText}
        isYoutubeBtnPressed={isYoutubeBtnPressed}
        placeholder={getPlaceholder()}
      />
    </>
  );
};

export default CreatePost;

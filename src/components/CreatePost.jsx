import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import CircularImage from "./CircularImage";
import PostModal from "./PostModal";
import "./CreatePost.css";
import { HiOutlinePhotograph } from "react-icons/hi";

const CreatePost = (props) => {
  const [showPostModal, setShowPostModal] = useState(false);

  const handleClose = () => setShowPostModal(false);

  const handleClick = () => setShowPostModal(true);

  return (
    <>
      <Card className="w-75 m-auto p-0" id="card">
        <Card.Body>
          <Card.Title>
            <CircularImage size="40" url={props.user.profilePictureURL} />
            <div id="text-div" className="p-2 w-75" onClick={handleClick}>
              What's on your mind {props.user.firstname}?
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

      <PostModal show={showPostModal} onClose={handleClose} user={props.user} />
    </>
  );
};

export default CreatePost;

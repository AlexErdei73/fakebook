import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import CircularImage from "./CircularImage";
import "./CreatePost.css";
import { HiOutlinePhotograph } from "react-icons/hi";

const CreatePost = (props) => {
  return (
    <>
      <Card className="w-75 m-auto p-0" id="card">
        <Card.Body>
          <Card.Title>
            <CircularImage size="40" url={props.user.profilePictureURL} />
            <div id="text-div" className="p-2 w-75">
              What's on your mind {props.user.firstname}?
            </div>
          </Card.Title>
          <hr></hr>
          <Button variant="light" id="photo-btn" size="sm">
            <HiOutlinePhotograph size="28px" className="text-success" />
            Photo/Video
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default CreatePost;

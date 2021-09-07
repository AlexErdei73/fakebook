import React from "react";
import { Modal, Button, Row } from "react-bootstrap";
import ResponsiveImage from "./ResponsiveImage";

const UpdateProfilePicModal = (props) => {
  const { show, onHide, onBtnClick, onPhotoClick, userID, photos } = props;

  return (
    <Modal show={show} onHide={onHide} size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title style={{ margin: "auto" }}>
          <strong>Update Profile Picture</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          size="sm"
          variant="outline-primary"
          className="w-50 m-2 mb-3"
          onClick={onBtnClick}
        >
          <b>+ Upload Photo</b>
        </Button>
        <br />
        <b>Suggested Photos</b>
        <Row className="m-1">
          {photos.map((photo, index) => {
            return (
              <ResponsiveImage
                key={index}
                width="15%"
                height="15%"
                userID={userID}
                photo={photo}
                index={index}
                onClick={onPhotoClick}
                className="m-1"
              />
            );
          })}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProfilePicModal;

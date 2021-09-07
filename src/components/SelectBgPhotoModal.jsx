import React from "react";
import { Modal } from "react-bootstrap";
import { StorageImage } from "reactfire";

const SelectBgPhotoModal = (props) => {
  const { show, hideModal, onPhotoClick, userID, photos } = props;

  return (
    <Modal show={show} onHide={hideModal} scrollable>
      <Modal.Header closeButton>
        <Modal.Title style={{ marginLeft: "35%" }}>
          <strong>Select Photo</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {photos.map((photo, index) => {
          return (
            <StorageImage
              className="m-1"
              width="31%"
              height="90px"
              alt=""
              key={index}
              id={index}
              storagePath={`${userID}/${photo.fileName}`}
              style={{
                objectFit: "cover",
              }}
              onClick={onPhotoClick}
            ></StorageImage>
          );
        })}
      </Modal.Body>
    </Modal>
  );
};

export default SelectBgPhotoModal;

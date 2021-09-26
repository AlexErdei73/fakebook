import React from "react";
import { Modal } from "react-bootstrap";

const PostModal = (props) => {
  const { show, onClose } = props;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <div className="w-100 d-flex justify-content-center">
          <Modal.Title>Create Post</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>This is the body ...</Modal.Body>
      <Modal.Footer>This is the footer ...</Modal.Footer>
    </Modal>
  );
};

export default PostModal;

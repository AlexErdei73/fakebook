import React from "react";
import { Modal, Button } from "react-bootstrap";

const RemoveCoverPhotoDlg = (props) => {
  const { show, removeCoverPhoto, closeDlg } = props;

  return (
    <Modal show={show} onHide={closeDlg}>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong className="fs-2">Remove Cover Photo</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Do you really want to remove the cover photo?</div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="link"
          style={{ textDecoration: "none" }}
          onClick={closeDlg}
        >
          <b>Cancel</b>
        </Button>
        <Button variant="primary" onClick={removeCoverPhoto}>
          <b>Submit</b>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveCoverPhotoDlg;

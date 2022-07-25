import React, { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { sendPasswordReminder } from "../backend/backend";
import { errorOccured } from "../features/user/userSlice";

const PasswordReminderModal = (props) => {
  const { show, onHide, onExit } = props;

  const errorMsg = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  function handleChange(e) {
    e.preventDefault();
    const input = e.target;
    setEmail(input.value);
  }

  function handleClickSend() {
    sendPasswordReminder(email)
      .then(() => {
        onHide();
      })
      .catch((error) => dispatch(errorOccured(error.message)));
  }

  return (
    <Modal show={show} onHide={onHide} onExited={onExit}>
      <Modal.Header>
        <Modal.Title>
          <strong className="fs-2">Password Reset Email</strong>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorMsg !== "" && <Alert variant="danger">{errorMsg}</Alert>}
        <Form.Group>
          <Form.Label>
            Please enter the email address associated to your account to receive
            a password reset email.
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            size="lg"
            onChange={handleChange}
            value={email}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <hr />
        <Button
          variant="light"
          onClick={() => {
            onHide();
            dispatch(errorOccured(""));
          }}
        >
          <b>Cancel</b>
        </Button>
        <Button variant="primary" onClick={handleClickSend}>
          <b className="px-2">Send</b>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordReminderModal;

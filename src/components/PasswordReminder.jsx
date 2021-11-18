import React, { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useFirebaseApp } from "reactfire";

const PasswordReminder = (props) => {
  const { onHide } = props;

  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    e.preventDefault();
    const input = e.target;
    setEmail(input.value);
  }

  const firebase = useFirebaseApp();

  function handleClickSend() {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent!
        onHide();
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  }

  return (
    <>
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
        <Button variant="light" onClick={onHide}>
          <b>Cancel</b>
        </Button>
        <Button variant="primary" onClick={handleClickSend}>
          <b className="px-2">Send</b>
        </Button>
      </Modal.Footer>
    </>
  );
};

export default PasswordReminder;

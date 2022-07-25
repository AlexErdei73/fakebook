import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Signup.css";
import { createUserAccount } from "../backend/backend";

const SignupModal = (props) => {
  const { show, onHide, onExit } = props;

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const [validated, setValidated] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  // Submit function (Create account)
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      createUserAccount({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      });
      setFormIsValid(true);
    }
    setValidated(true);
  };

  useEffect(() => {
    if (formIsValid) onHide();
  }, [formIsValid, onHide]);

  return (
    <Modal show={show} onHide={onHide} onExited={onExit}>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong className="fs-2">Sign Up</strong>
          <div className="title-footer">It's quick and easy.</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="First name"
                name="firstname"
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                First name required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Surename"
                name="lastname"
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Last name required.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                type="email"
                placeholder="Email address"
                name="email"
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Email required in the right format.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="New password"
                name="password"
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password required.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <p className="text-muted p-1 text-legal">
              Signing Up for fakebook you agree to share the uploaded details
              with any other user. Please do not upload any sensitive data to
              the app, which is built strictly for demonstration purposes.
            </p>
          </Form.Row>
          <Row>
            <Button type="submit" variant="success" className="w-50 mx-auto">
              <strong>Sign Up</strong>
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;

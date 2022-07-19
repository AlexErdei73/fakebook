import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Signup.css";
import { useSelector } from "react-redux";
import { createUserAccount } from "../backend/backend";

const Signup = (props) => {
  const { user, onSubmit, onChange, onError } = props;

  const error = useSelector((state) => state.user.error);

  // onChange function
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  // Handle name change on form differently because of first and last name
  const [name, setName] = useState({
    firstname: "",
    lastname: "",
  });

  const handleNameChange = (e) => {
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
  };

  const [validated, setValidated] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  // Submit function (Create account)
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      createUserAccount({
        firstname: name.firstname,
        lastname: name.lastname,
        email: user.email,
        password: user.password,
      });
      setFormIsValid(true);
    }
    setValidated(true);
  };

  useEffect(() => {
    if (formIsValid) {
      if (error) onError(error.message);
      onSubmit();
    }
  }, [formIsValid, error, onError, onSubmit]);

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            placeholder="First name"
            name="firstname"
            onChange={handleNameChange}
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
            onChange={handleNameChange}
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
          Signing Up for fakebook you agree to share the uploaded details with
          any other user. Please do not upload any sensitive data to the app,
          which is built strictly for demonstration purposes.
        </p>
      </Form.Row>
      <Row>
        <Button type="submit" variant="success" className="w-50 mx-auto">
          <strong>Sign Up</strong>
        </Button>
      </Row>
    </Form>
  );
};

export default Signup;

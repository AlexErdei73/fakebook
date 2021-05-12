import React, { useState } from "react";
import { useFirebaseApp } from "reactfire";
import "firebase/auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = (props) => {
  // Import firebase
  var firebase = useFirebaseApp();

  // onChange function
  const handleChange = (e) => {
    props.onChange(e.target.name, e.target.value);
  };

  // Submit function (Create account)
  const handleSubmit = (e) => {
    e.preventDefault();
    //signIn code here ...
    firebase
      .auth()
      .signInWithEmailAndPassword(props.user.email, props.user.password)
      .then((result) => {
        // email has been verified?
        if (!result.user.emailVerified) {
          firebase.auth().signOut();
          throw Error("Please verify your email before to continue");
        } else {
          props.onChange("nickname", result.user.displayName);
        }
      })
      .catch((error) => {
        // Update the error
        console.log(error);
        props.onError(error.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="w-100">
      <Form.Control
        type="email"
        placeholder="Email"
        name="email"
        size="lg"
        className="mb-2 w-100"
        onChange={handleChange}
      />
      <Form.Control
        type="password"
        placeholder="Password"
        name="password"
        size="lg"
        className="mb-2 w-100"
        onChange={handleChange}
      />
      <Button variant="primary" type="submit" size="lg" className="w-100">
        <b>Log In</b>
      </Button>
      <Button variant="link" type="link" className="w-100">
        Forgotten password?
      </Button>
    </Form>
  );
};

export default Login;

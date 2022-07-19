import React, { useState, useEffect } from "react";
import { useFirebaseApp } from "reactfire";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { errorOccured } from "../features/user/userSlice";

const Login = (props) => {
  const { onError, onChange, user, onClickForgottenPswd } = props;

  // Import firebase
  var firebase = useFirebaseApp();

  // onChange function
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
    dispatch(errorOccured(""));
  };

  const errorMsg = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  console.log(errorMsg);

  // Submit function (Create account)
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //signIn code here ...
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        // email has been verified?
        if (!result.user.emailVerified) {
          firebase.auth().signOut();
          dispatch(errorOccured("Please verify your email before to continue"));
        } else {
          dispatch(errorOccured(""));
        }
      })
      .catch((error) => {
        // Update the error
        if (user.email === "") dispatch(errorOccured("Email is required."));
        else if (user.password === "")
          dispatch(errorOccured("Password is required."));
        else dispatch(errorOccured(error.message));
      });
  };

  return (
    <>
      <Form noValidate onSubmit={handleSubmit} className="w-100">
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
          size="lg"
          className="mb-2 w-100"
          onChange={handleChange}
          isInvalid={
            errorMsg.indexOf("mail") !== -1 ||
            errorMsg.indexOf("identifier") !== -1
          }
        />
        <Form.Control
          type="text"
          placeholder="Password"
          name="password"
          size="lg"
          className="mb-2 w-100"
          onChange={handleChange}
          isInvalid={errorMsg !== ""}
        />
        <Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
        <Button variant="primary" type="submit" size="lg" className="w-100">
          <b>Log In</b>
        </Button>
      </Form>
      <Button
        variant="link"
        type="link"
        className="w-100"
        id="link-button"
        onClick={onClickForgottenPswd}
      >
        Forgotten password?
      </Button>
    </>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { useFirebaseApp } from "reactfire";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = (props) => {
  // Import firebase
  var firebase = useFirebaseApp();

  // onChange function
  const handleChange = (e) => {
    props.onChange(e.target.name, e.target.value);
    setErrorMsg("");
  };

  const [errorMsg, setErrorMsg] = useState(props.user.error);

  // Submit function (Create account)
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    //signIn code here ...
    firebase
      .auth()
      .signInWithEmailAndPassword(props.user.email, props.user.password)
      .then((result) => {
        // email has been verified?
        if (!result.user.emailVerified) {
          firebase.auth().signOut();
          setErrorMsg("Please verify your email before to continue");
        } else {
          setErrorMsg("");
        }
      })
      .catch((error) => {
        // Update the error
        if (props.user.email === "") setErrorMsg("Email is required.");
        else if (props.user.password === "")
          setErrorMsg("Password is required.");
        else setErrorMsg(error.message);
      });
  };

  useEffect(() => {
    props.onError(errorMsg);
  }, [errorMsg]);

  useEffect(() => {
    setErrorMsg(props.user.error);
  }, [props.user]);

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
        onClick={props.onClickForgottenPswd}
      >
        Forgotten password?
      </Button>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { useFirebaseApp } from "reactfire";
import "firebase/auth";
import "./Login.css";

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
        }
      })
      .catch((error) => {
        // Update the error
        console.log(error);
        props.onError(error.message);
      });
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;

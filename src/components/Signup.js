import React, { useState } from "react";
import { useFirebaseApp } from "reactfire";
import "firebase/auth";
import "./Signup.css";

const Signup = (props) => {
  // Import firebase
  var firebase = useFirebaseApp();

  // onChange function
  const handleChange = (e) => {
    props.onChange(e.target.name, e.target.value);
  };

  // Submit function (Create account)
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(props.user.email, props.user.password)
      .then((result) => {
        // Update the nickname
        result.user.updateProfile({
          displayName: props.user.nickname,
        });
        // Sign out the user
        firebase.auth().signOut();

        // URL of my website.
        const myURL = { url: "http://localhost:3000/" };

        // Send Email Verification and redirect to my website.
        return result.user.sendEmailVerification(myURL);
      })
      .catch((error) => {
        // Update the error
        console.log(error);
        props.onError(error.message);
      });
  };

  return (
    <div className="signup">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nickname"
          name="nickname"
          onChange={handleChange}
        />
        <br />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

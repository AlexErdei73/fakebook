import React, { useState } from "react";
import { useFirebaseApp } from "reactfire";
import "firebase/auth";
import "firebase/firestore";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Signup.css";

const Signup = (props) => {
  // Import firebase
  var firebase = useFirebaseApp();

  // onChange function
  const handleChange = (e) => {
    props.onChange(e.target.name, e.target.value);
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

  // Submit function (Create account)
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(props.user.email, props.user.password)
      .then((result) => {
        // Update the nickname
        result.user.updateProfile({
          displayName: `${name.firstname} ${name.lastname}`,
        });
        // Create firestore document
        firebase
          .firestore()
          .collection("users")
          .doc(result.user.uid)
          .set({
            firstname: name.firstname,
            lastname: name.lastname,
            profilePictureURL: "fakebook-avatar.jpeg",
            backgroundPictureURL: "background-server.jpg",
            photos: [],
          })
          .then(() => {
            // Sign out the user
            firebase.auth().signOut();
          });

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
    props.onSubmit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            placeholder="First name"
            name="firstname"
            onChange={handleNameChange}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            placeholder="Surename"
            name="lastname"
            onChange={handleNameChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Control
            type="email"
            placeholder="Email address"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            placeholder="New password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <p className="text-muted p-1" id="text-legal">
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

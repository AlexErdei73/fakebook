import React, { useState } from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useSigninCheck } from "reactfire";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import RecentLogins from "./components/RecentLogins";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useUser } from "reactfire";
import "firebase/auth";
import "firebase/firestore";
import UserAccount from "./components/UserAccount";
import PasswordReminder from "./components/PasswordReminder";

function App() {
  const { data: user } = useUser();

  // User State
  const initUser = {
    email: "",
    password: "",
    error: "",
  };

  const [userState, setUserState] = useState(initUser);

  function addError(errorMsg) {
    setUserState({
      ...userState,
      error: errorMsg,
    });
  }

  function updateUser(name, value) {
    setUserState({
      ...userState,
      [name]: value,
      error: "",
    });
  }

  //Handle the modal
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
  }

  //get the first and lastName for the route of the profile
  const name =
    (user && user.displayName && user.displayName.trim().split(" ")) || [];

  const lastName = name.pop();

  const firstName = name.join(" ");

  const profileLink = `/${lastName}.${firstName}`;

  //handling the password reminder button
  const [isModalSignup, setModalSignup] = useState(true);

  function handleClickPasswordReminderBtn() {
    setModalSignup(false);
    handleShow();
  }

  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return <div>...Loading</div>;
  }

  if (
    signInCheckResult.signedIn === true &&
    userState.error !== "Please verify your email before to continue"
  ) {
    //Reactfire is still buggy in ver 3.0.0
    //Even if user is signed in, the useUser
    //hook can give back null for the current
    //user. In this case the user has no
    //premission to read firebase and the error
    //is not caught by reactfire. Strangely
    //refreshing the browser solves the issue.
    if (!user) {
      window.location.reload(false);
    }

    if (user.emailVerified)
      return (
        <UserAccount
          userID={user.uid}
          profileLink={profileLink}
          userState={userState}
        />
      );
    else return <></>;
  } else {
    return (
      <div className="bg-200 vw-100">
        <Container className="w-100 p-0" fluid>
          <Row className="vh-100 align-items-center">
            <Col
              lg={{ span: 5, offset: 1 }}
              className="d-flex justify-content-center"
            >
              <RecentLogins></RecentLogins>
            </Col>
            <Col lg={5} className="d-flex justify-content-center">
              <div className="login p-3 bg-light">
                <Login
                  onError={addError}
                  onChange={updateUser}
                  user={userState}
                  onClickForgottenPswd={handleClickPasswordReminderBtn}
                  disabled
                ></Login>
                <hr />
                <Button
                  variant="success"
                  size="lg"
                  className="d-block w-60 mx-auto mt-4"
                  onClick={handleShow}
                >
                  <b>Create New Account</b>
                </Button>
              </div>
            </Col>
            <Modal
              show={show}
              onHide={handleClose}
              onExited={() => setModalSignup(true)}
            >
              <Modal.Header closeButton={isModalSignup}>
                <Modal.Title>
                  <strong className="fs-2">
                    {isModalSignup ? "Sign Up" : "Password Reset Email"}
                  </strong>
                  {isModalSignup && (
                    <div id="title-footer">It's quick and easy.</div>
                  )}
                </Modal.Title>
              </Modal.Header>

              {isModalSignup ? (
                <Modal.Body>
                  <Signup
                    onError={addError}
                    onChange={updateUser}
                    onSubmit={handleClose}
                    user={userState}
                  ></Signup>
                </Modal.Body>
              ) : (
                <PasswordReminder onHide={handleClose} />
              )}
            </Modal>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

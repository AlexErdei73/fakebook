import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RecentLogins from "./components/RecentLogins";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserAccount from "./components/UserAccount";
import PasswordReminder from "./components/PasswordReminder";
import { useSelector } from "react-redux";
import { subscribeAuth } from "./backend/backend";

function App() {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = subscribeAuth();
    return unsubscribe;
  }, []);

  // User State
  const initUser = {
    email: "",
    password: "",
    error: "",
  };

  const [userState, setUserState] = useState(initUser);

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

  const handleCloseCallback = useCallback(handleClose, []);

  //get the first and lastName for the route of the profile
  const name =
    (user && user.displayName && user.displayName.trim().split(" ")) || [];

  const lastName = name.pop();

  const firstName = name.join(" ");

  const profileLink = `/fakebook/${lastName}.${firstName}`;

  //handling the password reminder button
  const [isModalSignup, setModalSignup] = useState(true);

  function handleClickPasswordReminderBtn() {
    setModalSignup(false);
    handleShow();
  }

  /*if (user.id !== "loading") {
    return <div>...Loading</div>;
  }*/

  if (user.isSignedIn && !user.error) {
    if (user.isEmailVerified)
      return <UserAccount profileLink={profileLink} userState={userState} />;
    else return <></>;
  } else {
    return (
      <Col className="bg-200 vh-100">
        <Row className="h-100 align-items-center">
          <Col
            lg={{ span: 5, offset: 1 }}
            className="d-flex justify-content-center"
          >
            <RecentLogins></RecentLogins>
          </Col>
          <Col lg={5} className="bg-200 d-flex justify-content-center">
            <div className="login p-3 bg-light">
              <Login
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
                  <div className="title-footer">It's quick and easy.</div>
                )}
              </Modal.Title>
            </Modal.Header>

            {isModalSignup ? (
              <Modal.Body>
                <Signup
                  onChange={updateUser}
                  onSubmit={handleCloseCallback}
                  user={userState}
                ></Signup>
              </Modal.Body>
            ) : (
              <PasswordReminder onHide={handleClose} />
            )}
          </Modal>
        </Row>
      </Col>
    );
  }
}

export default App;

import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import SignupModal from "./components/SignupModal.jsx";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RecentLogins from "./components/RecentLogins";
import Button from "react-bootstrap/Button";
import UserAccount from "./components/UserAccount";
import PasswordReminderModal from "./components/PasswordReminderModal";
import { useSelector } from "react-redux";
import { subscribeAuth } from "./backend/backend";

function App() {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = subscribeAuth();
    return unsubscribe;
  }, []);

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

  if (user.isLoading) {
    return <div>...Loading</div>;
  }

  if (user.isSignedIn && !user.error) {
    if (user.isEmailVerified) return <UserAccount profileLink={profileLink} />;
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

          <SignupModal
            show={show && isModalSignup}
            onHide={handleCloseCallback}
            onExit={() => setModalSignup(true)}
          ></SignupModal>

          <PasswordReminderModal
            show={show && !isModalSignup}
            onHide={handleClose}
            onExit={() => setModalSignup(true)}
          />
        </Row>
      </Col>
    );
  }
}

export default App;

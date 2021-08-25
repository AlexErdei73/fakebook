import React, { useState } from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TitleBar from "./components/Titlebar";
import Profile from "./components/Profile";
import PhotoViewer from "./components/PhotoViewer";
import { AuthCheck } from "reactfire";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import RecentLogins from "./components/RecentLogins";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useUser } from "reactfire";
import "firebase/auth";
import "firebase/firestore";

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

  return (
    <div className="bg-200 vw-100">
      <Container className="w-100 p-0" fluid>
        <AuthCheck
          fallback={
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
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <strong className="fs-2">Sign Up</strong>
                    <div id="title-footer">It's quick and easy.</div>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Signup
                    onError={addError}
                    onChange={updateUser}
                    onSubmit={handleClose}
                    user={userState}
                  ></Signup>
                </Modal.Body>
              </Modal>
            </Row>
          }
        >
          <BrowserRouter>
            <TitleBar profileLink={`/${lastName}.${firstName}`} />
            <Switch>
              <Route
                path={`/photo/:userID/:n`}
                render={() => <PhotoViewer />}
              />
              <Route
                path={`/${lastName}.${firstName}`}
                render={() => <Profile userID={user.uid} />}
              />
              <Route
                path="/"
                render={() => (
                  <h1 className="mt-5">
                    Home Page for {`${firstName} ${lastName}`}
                  </h1>
                )}
              />
            </Switch>
          </BrowserRouter>
        </AuthCheck>
        <div>{userState.error && <h4>{userState.error}</h4>}</div>
      </Container>
    </div>
  );
}

export default App;

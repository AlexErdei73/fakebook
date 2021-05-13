import React, { useState } from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { AuthCheck } from "reactfire";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import RecentLogins from "./components/RecentLogins";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function App() {
  // User State
  const [user, setUser] = useState({
    nickname: "",
    email: "",
    password: "",
    error: "",
  });

  function addError(errorMsg) {
    setUser({
      ...user,
      error: errorMsg,
    });
  }

  function updateUser(name, value) {
    setUser({
      ...user,
      [name]: value,
      error: "",
    });
  }

  //Handle the modal
  const [show, setShow] = useState(true);

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
  }

  return (
    <div className="bg-200 vw-100">
      <Container>
        <AuthCheck
          fallback={
            <Row className="vh-100 align-items-center">
              <Col lg={6} className="d-flex justify-content-center">
                <RecentLogins></RecentLogins>
              </Col>
              <Col lg={6} className="d-flex justify-content-center">
                <div className="login p-3 bg-light">
                  <Login
                    onError={addError}
                    onChange={updateUser}
                    user={user}
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
                    user={user}
                  ></Signup>
                </Modal.Body>
              </Modal>
            </Row>
          }
        >
          <Logout userName={user.nickname}></Logout>
        </AuthCheck>
        <div>{user.error && <h4>{user.error}</h4>}</div>
      </Container>
    </div>
  );
}

export default App;

import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { FaFacebook } from "react-icons/fa";
import { useUser } from "reactfire";
import { useFirebaseApp } from "reactfire";
import "firebase/auth";

const TitleBar = (props) => {
  //Update the user if the state does not contain the correct username
  const { data: user } = useUser();
  if (props.user.name !== user.displayName) {
    props.updateUser("name", user.displayName);
  }

  // Import firebase
  const firebase = useFirebaseApp();

  // Log out function
  const handleClick = () => {
    firebase.auth().signOut();
    props.resetUser();
  };

  return (
    <Navbar bg="light" fixed="top" expand="sm" className="p-0">
      <Navbar.Brand as={Link} to="/">
        <FaFacebook color="dodgerblue" fontSize="2em" className="mx-3" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-50 justify-content-start mr-5">
          <Nav.Item>
            <Link to="/" className="nav-link">
              <VscHome />
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={props.profileLink} className="nav-link">
              Profile
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
      <Nav className="w-25 justify-content-end">
        <Nav.Item>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClick}
            className="m-2"
          >
            Log Out
          </Button>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default TitleBar;

import React, { useState } from "react";
import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { FaFacebook } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import "./Titlebar.css";
import ProfileLink from "./ProfileLink";
import { useFirebaseApp } from "reactfire";
import { handleClickLink } from "./helper";

const TitleBar = (props) => {
  //get the signed in user
  const user = props.user;

  // Import firebase
  const firebase = useFirebaseApp();

  // Log out function
  const handleClick = () => {
    firebase.auth().signOut();
  };

  //add the active status of the link DOM elements
  const [activeLink, setActiveLink] = useState(null);

  return (
    <Navbar bg="light" fixed="top" expand="sm" className="p-0">
      <Navbar.Brand as={Link} to="/">
        <FaFacebook color="dodgerblue" fontSize="2em" className="mx-3" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-75 justify-content-start mr-5">
          <Nav.Item>
            <Link
              to="/"
              className="nav-link"
              onClick={(e) => handleClickLink(e, activeLink, setActiveLink)}
            >
              <VscHome
                fontSize="2rem"
                className="mx-4"
                style={{ pointerEvents: "none" }}
              />
            </Link>
          </Nav.Item>
        </Nav>
        <Nav className="w-25 justify-content-end align-self-center">
          <Nav.Item className="align-self-center">
            <Link
              to={props.profileLink}
              className="nav-link"
              onClick={(e) => handleClickLink(e, activeLink, setActiveLink)}
              style={{ paddingBottom: "0.75rem", paddingTop: "0.75rem" }}
              id="profile"
            >
              <ProfileLink user={user} />
            </Link>
          </Nav.Item>
          <DropdownButton
            id="custom-drop-down-btn"
            title=""
            className="mr-4"
            menuAlign="right"
          >
            <Dropdown.Item
              as={Link}
              to="/"
              onClick={handleClick}
              className="p-0"
            >
              <ImExit fontSize="1.5em" className="mx-4" />
              <span>Log Out</span>
              <div style={{ width: "20em" }}></div>
            </Dropdown.Item>
          </DropdownButton>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TitleBar;

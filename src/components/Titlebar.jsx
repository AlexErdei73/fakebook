import React from "react";
import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { FaFacebook } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { ImExit } from "react-icons/im";
import "./Titlebar.css";
import ProfileLink from "./ProfileLink";
import { useFirebaseApp } from "reactfire";

const TitleBar = (props) => {
  //get the signed in user and closeFriendsListPage function
  const { user, closeFriendsListPage, refs, dimension } = props;

  // Import firebase
  const firebase = useFirebaseApp();

  // Log out function
  const handleClick = () => {
    firebase.auth().signOut();
  };

  const SM_WINDOW = 640;

  return (
    <Navbar bg="light" fixed="top" expand="sm" className="p-0">
      <Navbar.Brand as={Link} to="/">
        <FaFacebook color="dodgerblue" fontSize="2em" className="mx-3" />
      </Navbar.Brand>
      {dimension.width > SM_WINDOW && <div style={{ width: "450px" }} />}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-75 justify-content-start mr-5">
          <Nav.Item>
            <Link to="/" className="nav-link" ref={refs.home}>
              <VscHome
                fontSize="2rem"
                className="mx-4"
                style={{ pointerEvents: "none" }}
              />
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/friends/list" className="nav-link" ref={refs.friends}>
              <FaUserFriends
                fontSize="2rem"
                className="mx-4"
                style={{ pointerEvents: "none" }}
              />
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/watch" className="nav-link" ref={refs.watch}>
              <MdOndemandVideo
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
              to={props.profilelink}
              className="nav-link"
              onClick={(e) => {
                closeFriendsListPage();
              }}
              id="profile"
              ref={refs.profile}
            >
              <ProfileLink user={user} size="30" fullname="false" bold="true" />
            </Link>
          </Nav.Item>
          <Nav.Item className="align-self-center">
            <DropdownButton
              id="custom-drop-down-btn"
              title=""
              className="mr-4"
              menuAlign="right"
            >
              <Dropdown.Item
                as={Link}
                to={props.profilelink}
                onClick={() => closeFriendsListPage()}
              >
                <ProfileLink
                  user={user}
                  size="60"
                  fullname="true"
                  bold="true"
                />
              </Dropdown.Item>
              <Dropdown.Divider />
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
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TitleBar;

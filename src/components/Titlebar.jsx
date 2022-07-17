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
import { signUserOut } from "../backend/backend";
import { useSelector } from "react-redux";

const TitleBar = (props) => {
  //get the signed in user and closeFriendsListPage function
  const { closeFriendsListPage, refs } = props;

  const user = useSelector((state) => state.currentUser);

  // Log out function
  const handleClick = () => {
    signUserOut();
  };

  return (
    <Navbar bg="light" fixed="top" className="p-0">
      <Navbar.Brand as={Link} to="/fakebook">
        <FaFacebook color="dodgerblue" fontSize="2em" className="mx-3" />
      </Navbar.Brand>
      <div style={{ width: "450px" }} className="spaceing" />
      <Nav className="w-75 justify-content-start mr-5">
        <Nav.Item className="first">
          <Link to="/fakebook" className="nav-link" ref={refs.home}>
            <VscHome
              fontSize="2rem"
              className="mx-4"
              style={{ pointerEvents: "none" }}
            />
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to="/fakebook/friends/list"
            className="nav-link"
            ref={refs.friends}
          >
            <FaUserFriends
              fontSize="2rem"
              className="mx-4"
              style={{ pointerEvents: "none" }}
            />
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/fakebook/watch" className="nav-link" ref={refs.watch}>
            <MdOndemandVideo
              fontSize="2rem"
              className="mx-4"
              style={{ pointerEvents: "none" }}
            />
          </Link>
        </Nav.Item>
      </Nav>

      <Nav className="w-25 justify-content-end align-self-center">
        <Nav.Item className="align-self-center first">
          <Link
            to={props.profilelink}
            className="nav-link profile"
            id="profile"
            onClick={(e) => {
              closeFriendsListPage();
            }}
            ref={refs.profile}
          >
            <ProfileLink user={user} size="30" fullname="false" bold="true" />
          </Link>
        </Nav.Item>
        <Nav.Item className="align-self-center">
          <DropdownButton
            title=""
            className="mr-4 custom-drop-down-btn"
            menuAlign="right"
          >
            <Dropdown.Item
              as={Link}
              to={props.profilelink}
              onClick={() => closeFriendsListPage()}
            >
              <ProfileLink user={user} size="60" fullname="true" bold="true" />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              as={Link}
              to="/fakebook/"
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
    </Navbar>
  );
};

export default TitleBar;

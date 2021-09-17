import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileLink from "./ProfileLink";
import { FaUserFriends } from "react-icons/fa";
import "./LeftNavbar.css";

const LeftNavbar = (props) => {
  return (
    <Nav className="flex-column mt-3" id="left-navbar">
      <div className="navitem">
        <Nav.Link
          as={Link}
          to={props.profileLink}
          className="text-dark flex-column justify-content-center"
        >
          <ProfileLink user={props.user} size="26" fullname="true" />
        </Nav.Link>
      </div>
      <div className="navitem">
        <Nav.Link as={Link} to="/friends/list" className="text-dark">
          <FaUserFriends size="26px" className="text-info mr-3" />
          <div className="d-inline">Friends</div>
        </Nav.Link>
      </div>
    </Nav>
  );
};

export default LeftNavbar;

import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileLink from "./ProfileLink";
import { FaUserFriends } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import "./LeftNavbar.css";
import { useSelector } from "react-redux";

const LeftNavbar = (props) => {
  const user = useSelector((state) => state.currentUser);

  return (
    <Nav className="flex-column mt-3" id="left-navbar">
      <div className="navitem">
        <Nav.Link
          as={Link}
          to={props.profileLink}
          className="text-dark flex-column justify-content-center"
        >
          <ProfileLink user={user} size="26" fullname="true" />
        </Nav.Link>
      </div>
      <div className="navitem">
        <Nav.Link as={Link} to="/fakebook/friends/list" className="text-dark">
          <FaUserFriends size="26px" className="text-info mr-2" />
          <div className="d-inline">Friends</div>
        </Nav.Link>
      </div>
      <div className="navitem">
        <Nav.Link as={Link} to="/fakebook/watch" className="text-dark">
          <MdOndemandVideo size="26px" className="text-info mr-2" />
          <div className="d-inline">Watch</div>
        </Nav.Link>
      </div>
    </Nav>
  );
};

export default LeftNavbar;

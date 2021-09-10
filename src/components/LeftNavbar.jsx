import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const LeftNavbar = (props) => {
  return (
    <Nav className="flex-column">
      <Nav.Link as={Link} to={props.profileLink} className="text-dark">
        Profile
      </Nav.Link>
      <Nav.Link className="text-dark">Friends</Nav.Link>
    </Nav>
  );
};

export default LeftNavbar;

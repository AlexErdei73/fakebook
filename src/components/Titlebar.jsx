import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { FaFacebook } from "react-icons/fa";
import { useUser } from "reactfire";

const TitleBar = (props) => {
  //Update the user if the state does not contain the correct username
  const { data: user } = useUser();
  if (props.user.name !== user.displayName) {
    props.updateUser("name", user.displayName);
  }

  return (
    <Navbar bg="light" variant="light" fixed="top">
      <Navbar.Brand as={Link} to="/">
        <FaFacebook />
      </Navbar.Brand>
      <Nav className="w-100 justify-content-end">
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
    </Navbar>
  );
};

export default TitleBar;

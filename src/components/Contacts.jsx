import React from "react";
import { Nav } from "react-bootstrap";
import ProfileLink from "./ProfileLink";

const Contacts = (props) => {
  const { users } = props;

  return (
    <Nav className="flex-column">
      <h5 className="text-muted ml-3">
        <b>Contacts</b>
      </h5>
      {users.map((user, index) => (
        <div
          key={index}
          className="navitem text-dark flex-row justify-content-center p-2"
        >
          <ProfileLink size="26" fullname="true" bold="false" user={user} />
        </div>
      ))}
    </Nav>
  );
};

export default Contacts;

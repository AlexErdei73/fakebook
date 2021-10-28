import React, { useState } from "react";
import { CloseButton, Nav, OverlayTrigger } from "react-bootstrap";
import ProfileLink from "./ProfileLink";
import { FiEdit } from "react-icons/fi";

const Contacts = (props) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const { users } = props;

  function handleClick() {
    setShowOverlay(true);
  }

  function handleClose() {
    setShowOverlay(false);
  }

  return (
    <Nav
      className="flex-column"
      style={{
        height: "100%",
        position: "relative",
        margitTop: "50px",
      }}
    >
      <h5 className="text-muted ml-3">
        <b>Contacts</b>
      </h5>
      {users.map((user, index) => (
        <div
          key={index}
          className="navitem text-dark flex-row justify-content-center p-2"
          onClick={handleClick}
        >
          <ProfileLink size="26" fullname="true" bold="false" user={user} />
        </div>
      ))}
      <OverlayTrigger
        placement="left-start"
        show={showOverlay}
        overlay={
          <div
            style={{
              width: "100px",
              height: "200px",
              background: "white",
              color: "dodgerblue",
            }}
          >
            <CloseButton onClick={handleClose} className="text-primary" />
            This is the overlay ...
          </div>
        }
      >
        <div
          style={{
            position: "absolute",
            background: "white",
            padding: "12px",
            borderRadius: "50%",
            bottom: "20px",
            right: "26px",
            boxShadow: "0px 5px 5px 0px lightgray",
          }}
          onClick={handleClick}
        >
          <FiEdit size="22px" />
        </div>
      </OverlayTrigger>
    </Nav>
  );
};

export default Contacts;

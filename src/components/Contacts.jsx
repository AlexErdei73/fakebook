import React, { useState } from "react";
import { Card, CloseButton, Nav, OverlayTrigger } from "react-bootstrap";
import ProfileLink from "./ProfileLink";
import { FiEdit } from "react-icons/fi";

const Contacts = (props) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [messageTo, setMessageTo] = useState(null);

  const { users } = props;

  function handleClick(user) {
    setShowOverlay(true);
    setMessageTo(user);
  }

  function handleClose() {
    setShowOverlay(false);
    setMessageTo(null);
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
          onClick={() => handleClick(user)}
        >
          <ProfileLink size="26" fullname="true" bold="false" user={user} />
        </div>
      ))}
      <OverlayTrigger
        placement="left-start"
        show={showOverlay}
        overlay={
          <Card
            style={{
              width: "350px",
              height: "450px",
              background: "white",
              fontSize: "1.2rem",
            }}
          >
            <Card.Body>
              <Card.Title>
                {messageTo && (
                  <ProfileLink
                    size="26"
                    fullname="true"
                    bold="true"
                    user={messageTo}
                  />
                )}
                <div id="close-btn-container">
                  <CloseButton onClick={handleClose} className="text-primary" />
                </div>
              </Card.Title>
            </Card.Body>
          </Card>
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
          onClick={() => handleClick(null)}
        >
          <FiEdit size="22px" />
        </div>
      </OverlayTrigger>
    </Nav>
  );
};

export default Contacts;

import React from "react";
import CircularImage from "./CircularImage";
import { Row, Col } from "react-bootstrap";

const ProfileLink = (props) => {
  const { size, fullname, bold, user } = props;

  const { firstname, lastname, profilePictureURL, isOnline } = user;

  let name;
  if (fullname === "true") name = `${firstname} ${lastname}`;
  else name = `${firstname}`;

  return (
    <Row
      style={{
        minWidth: "150px",
        color: "inherited",
      }}
    >
      <Col xs="auto" className="px-2 ml-2">
        <CircularImage
          size={size}
          url={profilePictureURL}
          isOnline={isOnline}
        />
      </Col>
      <Col className="align-self-center p-0" style={{ color: "inherited" }}>
        {bold === "true" ? <b>{name}</b> : name}
      </Col>
    </Row>
  );
};

export default ProfileLink;

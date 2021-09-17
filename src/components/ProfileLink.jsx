import React from "react";
import CircularImage from "./CircularImage";
import { Row, Col } from "react-bootstrap";

const ProfileLink = (props) => {
  const { size, fullname, bold } = props;

  const { firstname, lastname, profilePictureURL } = props.user;

  let name;
  if (fullname === "true") name = `${firstname} ${lastname}`;
  else name = `${firstname}`;

  return (
    <Row {...props} style={{ minWidth: "150px" }}>
      <Col xs="auto">
        <CircularImage size={size} url={profilePictureURL} />
      </Col>
      <Col className="text-dark align-self-center p-0">
        {bold === "true" ? <b>{name}</b> : name}
      </Col>
    </Row>
  );
};

export default ProfileLink;

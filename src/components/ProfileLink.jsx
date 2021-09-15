import React from "react";
import CircularImage from "./CircularImage";
import { Container, Row, Col } from "react-bootstrap";

const ProfileLink = (props) => {
  const { size, fullname } = props;

  const { firstname, lastname, profilePictureURL } = props.user;

  let name;
  if (fullname === "true") name = `${firstname} ${lastname}`;
  else name = `${firstname}`;

  return (
    <Row {...props} style={{ minWidth: "150px" }}>
      <Col xs={1}>
        <CircularImage size={size} url={profilePictureURL} />
      </Col>
      <Col className="text-dark ml-1 align-self-center">
        {!fullname ? <b>{name}</b> : name}
      </Col>
    </Row>
  );
};

export default ProfileLink;

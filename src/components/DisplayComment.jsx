import React from "react";
import { Row, Col } from "react-bootstrap";
import { StorageImage } from "reactfire";
import CircularImage from "./CircularImage";

const DisplayComment = (props) => {
  const { comment, users, ...rest } = props;

  const userID = comment.userID;

  const user = users.find((user) => user.userID === userID);

  return (
    <Row {...rest}>
      <Col xs={1}>
        <CircularImage size="26" url={user.profilePictureURL} />
      </Col>
      <Col xs={11}>
        <p>
          <b>{`${user.firstname} ${user.lastname} `}</b>
          {comment.text}
        </p>
        {comment.isPhoto && (
          <StorageImage
            alt=""
            storagePath={comment.photoURL}
            style={{
              width: "30%",
            }}
          />
        )}
      </Col>
    </Row>
  );
};

export default DisplayComment;
